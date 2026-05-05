import os
import sys
import pickle
import logging
from sklearn.linear_model import LogisticRegression
from src.functions import LogisticRegression_with_p_values

logger = logging.getLogger(__name__)

MODEL_PATH = os.path.join(os.path.dirname(__file__), '..', 'models', 'pd_model.sav')

# Ensure custom classes used during model serialization are available
# during unpickling. The original model was saved from a script that
# defined LogisticRegression_with_p_values in __main__.
sys.modules['__main__'].LogisticRegression_with_p_values = LogisticRegression_with_p_values

def load_model():
    try:
        with open(MODEL_PATH, 'rb') as f:
            model = pickle.load(f)
        logger.info("Model loaded successfully from %s", MODEL_PATH)
        return model
    except Exception as e:
        logger.error("Failed to load model: %s", str(e))
        raise RuntimeError("Model loading failed") from e