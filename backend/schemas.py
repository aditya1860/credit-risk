from pydantic import BaseModel
from typing import Dict, Any, Optional


class LoanData(BaseModel):
    # Raw loan applicant data
    home_ownership: str
    addr_state: str
    purpose: str
    term: int  # e.g., 36 or 60
    emp_length: int  # 0-10
    int_rate: float
    mths_since_earliest_cr_line: int
    delinq_2yrs: int
    inq_last_6mths: int
    open_acc: int
    pub_rec: int
    total_acc: int
    acc_now_delinq: int
    total_rev_hi_lim: float
    annual_inc: float
    mths_since_last_delinq: Optional[float] = None  # nullable
    dti: float
    mths_since_last_record: Optional[float] = None  # nullable


class PredictionRequest(BaseModel):
    data: LoanData


class PredictionResponse(BaseModel):
    probability: float
    prediction: int
    risk_level: str
    credit_score: int
    top_features: Dict[str, Any]


class HealthResponse(BaseModel):
    status: str