# Credit Risk Modelling

This project contains credit risk scorecard and model preprocessing code.

## Setup

Open a terminal in the project root:

```powershell
cd C:\Users\lenovo\Desktop\Credit-Risk-Modelling-main
venv\Scripts\activate
python -m pip install -r requirements.txt
```

## Run the project

### Show project info

```powershell
python run.py info
```

### Preprocess the main input data

```powershell
python run.py preprocess
```

If you want to use the 2015-specific preprocessing method:

```powershell
python run.py preprocess --data2015
```

### Predict with the saved PD model

If the model needs the same encoded feature set used during training, first preprocess the input data:

```powershell
python run.py preprocess
```

Then predict from the saved model:

```powershell
python run.py predict
```

To predict a different row from the input data:

```powershell
python run.py predict --row 5
```

If you want to use another input file or model file:

```powershell
python run.py predict --input data\loan_data_inputs_train.csv --model models\pd_model.sav
```

## Notes

- `run.py` uses `src/functions.py`
- The repo already includes saved models in `models/`
- The main training data is in `data/loan_data_inputs_train.csv`
