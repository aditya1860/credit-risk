# Credit Risk Prediction API

FastAPI backend for credit risk prediction using a trained Logistic Regression model.

## Setup

1. Install dependencies:
   ```bash
   pip install -r backend/requirements.txt
   ```

2. Run the server:
   ```bash
   uvicorn backend.main:app --reload
   ```

The API will be available at http://127.0.0.1:8000

## Endpoints

- `GET /health`: Health check
- `POST /predict`: Predict credit risk

### POST /predict

Request body:
```json
{
  "data": {
    "home_ownership": "RENT",
    "addr_state": "CA",
    "purpose": "debt_consolidation",
    "term": 36,
    "emp_length": 5,
    "int_rate": 12.5,
    "mths_since_earliest_cr_line": 200,
    "delinq_2yrs": 0,
    "inq_last_6mths": 1,
    "open_acc": 5,
    "pub_rec": 0,
    "total_acc": 10,
    "acc_now_delinq": 0,
    "total_rev_hi_lim": 15000,
    "annual_inc": 50000,
    "mths_since_last_delinq": null,
    "dti": 15.0,
    "mths_since_last_record": null
  }
}
```

Response:
```json
{
  "probability": 0.03474679490997257,
  "prediction": 1,
  "risk_level": "Low",
  "credit_score": 820,
  "top_features": {
    "dti": "High debt-to-income ratio increases risk"
  }
}
```

## Features

- Model loading at startup
- Input preprocessing and feature alignment
- Credit score calculation (300-900 range)
- Risk level classification
- Basic explainability (top influencing features)