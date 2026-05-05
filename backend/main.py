import os

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import logging
import numpy as np
import pandas as pd
from backend.schemas import PredictionRequest, PredictionResponse, HealthResponse
from backend.model_loader import load_model
from backend.utils import (
    build_model_input,
    preproc_input,
    calculate_credit_score,
    get_risk_level,
    get_top_features,
    align_features,
)

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Environment-based CORS configuration
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:3000")

# Initialize FastAPI app
app = FastAPI(title="Credit Risk Prediction API", version="1.0.0")

# CORS is required to allow the browser frontend to call this backend from another origin.
# In production we explicitly allow the trusted frontend URL instead of using a wildcard.
app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_URL],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model at startup
model = None
try:
    model = load_model()
    logger.info("Model loaded successfully at startup")
except Exception as e:
    logger.error("Failed to load model at startup: %s", str(e))
    raise


@app.get("/health", response_model=HealthResponse)
async def health_check():
    """Health check endpoint"""
    return HealthResponse(status="OK")


@app.post("/predict", response_model=PredictionResponse)
async def predict_risk(request: PredictionRequest):
    """Predict credit risk for loan applicant"""
    try:
        # Convert input to DataFrame and prepare model features.
        data = request.data.dict()
        df = build_model_input(data)

        # Preprocess the data
        df_preprocessed = preproc_input(df)

        # Align features with model
        df_aligned = align_features(df_preprocessed, model)

        # Make prediction with a fallback for custom pickled model
        if hasattr(model, 'predict_proba'):
            probabilities = model.predict_proba(df_aligned)
        elif hasattr(model, 'model') and hasattr(model.model, 'predict_proba'):
            probabilities = model.model.predict_proba(df_aligned)
        elif hasattr(model, 'coef_') and hasattr(model, 'intercept_'):
            logits = np.dot(df_aligned.values, model.coef_.T) + model.intercept_
            probs = 1 / (1 + np.exp(-logits))
            probabilities = np.vstack([1 - probs, probs]).T
        else:
            raise AttributeError('Model does not support probability prediction')

        prob_high_risk = float(probabilities[0][1])  # Probability of class 1 (high risk)

        if hasattr(model, 'predict'):
            prediction = int(model.predict(df_aligned)[0])
        elif hasattr(model, 'model') and hasattr(model.model, 'predict'):
            prediction = int(model.model.predict(df_aligned)[0])
        else:
            prediction = int(prob_high_risk >= 0.5)

        # Calculate credit score
        credit_score = calculate_credit_score(prob_high_risk)

        # Get risk level
        risk_level = get_risk_level(prob_high_risk)

        # Get top features
        top_features = get_top_features(data)

        return PredictionResponse(
            probability=prob_high_risk,
            prediction=int(prediction),
            risk_level=risk_level,
            credit_score=credit_score,
            top_features=top_features
        )

    except Exception as e:
        logger.error("Prediction error: %s", str(e))
        raise HTTPException(status_code=500, detail="Prediction failed")