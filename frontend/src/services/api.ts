const API_BASE_URL = 'http://127.0.0.1:8000'

export interface LoanData {
  age?: number
  annual_inc: number
  loan_amnt: number
  emp_length: number
  delinq_2yrs: number
  home_ownership: string
  addr_state: string
  purpose: string
  term: number
  int_rate: number
  mths_since_earliest_cr_line: number
  inq_last_6mths: number
  open_acc: number
  pub_rec: number
  total_acc: number
  acc_now_delinq: number
  total_rev_hi_lim: number
  mths_since_last_delinq?: number | null
  dti: number
  mths_since_last_record?: number | null
}

export interface PredictionRequest {
  data: LoanData
}

export interface PredictionResponse {
  probability: number
  prediction: number
  risk_level: string
  credit_score: number
  top_features: Record<string, string>
}

export const api = {
  predict: async (data: LoanData): Promise<PredictionResponse> => {
    const response = await fetch(`${API_BASE_URL}/predict`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data }),
    })

    if (!response.ok) {
      throw new Error('Prediction failed')
    }

    return response.json()
  },

  health: async (): Promise<{ status: string }> => {
    const response = await fetch(`${API_BASE_URL}/health`)
    return response.json()
  },
}