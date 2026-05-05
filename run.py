import argparse
import os
import pickle
import sys

ROOT_DIR = os.path.abspath(os.path.dirname(__file__))
if ROOT_DIR not in sys.path:
    sys.path.insert(0, ROOT_DIR)

import pandas as pd

from src import functions
from src.functions import LogisticRegression_with_p_values, LinearRegression

sys.modules.setdefault("__main__", type(sys)('main'))
sys.modules["__main__"].LogisticRegression_with_p_values = LogisticRegression_with_p_values
sys.modules["__main__"].LinearRegression = LinearRegression


def data_path(relative_path: str) -> str:
    return os.path.join(ROOT_DIR, relative_path)


def load_csv(path: str) -> pd.DataFrame:
    if not os.path.exists(path):
        raise FileNotFoundError(f"Data file not found: {path}")
    try:
        return pd.read_csv(path, index_col=0)
    except Exception:
        return pd.read_csv(path)


def action_info(args):
    print("Project root:", ROOT_DIR)
    print("Available files:")
    for p in [
        "requirements.txt",
        "run.py",
        "src/functions.py",
        "data/loan_data_inputs_train.csv",
        "data/loan_data_2015.csv",
        "models/pd_model.sav",
        "models/lgd_model_step_1.sav",
        "models/lgd_model_step_2.sav",
    ]:
        print("  -", p, "[OK]" if os.path.exists(data_path(p)) else "[MISSING]")


def action_preprocess(args):
    input_path = data_path(args.input)
    output_path = data_path(args.output)
    df = load_csv(input_path)

    if args.data2015:
        processed = functions.preproc_input_data2015(df)
    else:
        processed = functions.preproc_input(df)

    processed.to_csv(output_path, index=False)
    print(f"Saved preprocessed data to: {output_path}")
    print("Result shape:", processed.shape)


def action_predict(args):
    model_path = data_path(args.model)
    input_path = data_path(args.input)

    if not os.path.exists(model_path):
        raise FileNotFoundError(f"Model file not found: {model_path}")
    df = load_csv(input_path)
    if args.row < 0 or args.row >= len(df):
        raise ValueError(f"Row index is out of range: {args.row}")
    row = df.iloc[[args.row]]

    with open(model_path, "rb") as f:
        model = pickle.load(f)

    print(f"Loaded model from: {model_path}")
    print(f"Input row shape: {row.shape}")

    scorer = model
    if not hasattr(scorer, "predict") and hasattr(scorer, "model"):
        scorer = scorer.model

    if hasattr(scorer, "feature_names_in_"):
        expected = list(scorer.feature_names_in_)
        row = row.loc[:, ~row.columns.str.startswith("Unnamed")]
        extra = [c for c in row.columns if c not in expected]
        if extra:
            print(f"Dropping {len(extra)} extra columns not used by model.")
            row = row.drop(columns=extra, errors="ignore")
        missing = [c for c in expected if c not in row.columns]
        if missing:
            print(f"Adding {len(missing)} missing model columns as zeros.")
            for c in missing:
                row[c] = 0
        row = row[expected]
        print(f"Aligned input row to model features: {row.shape}")

    if hasattr(scorer, "predict_proba"):
        probability = scorer.predict_proba(row)
        print("Predict proba:", probability.tolist())

    if hasattr(scorer, "predict"):
        prediction = scorer.predict(row)
        print("Prediction:", prediction.tolist())
    else:
        raise AttributeError("Loaded model has no predict method")


def main():
    parser = argparse.ArgumentParser(description="Credit Risk Modelling project entrypoint")
    subparsers = parser.add_subparsers(dest="command", required=True)

    info_parser = subparsers.add_parser("info", help="Show project status and available files")
    info_parser.set_defaults(func=action_info)

    preprocess_parser = subparsers.add_parser("preprocess", help="Preprocess data with the project functions")
    preprocess_parser.add_argument("--input", default="data/loan_data_inputs_train.csv", help="Input CSV file relative to project root")
    preprocess_parser.add_argument("--output", default="data/loan_data_inputs_train_preprocessed.csv", help="Output CSV file relative to project root")
    preprocess_parser.add_argument("--data2015", action="store_true", help="Use 2015-specific preprocessing function")
    preprocess_parser.set_defaults(func=action_preprocess)

    predict_parser = subparsers.add_parser("predict", help="Run a model prediction on one row of input data")
    predict_parser.add_argument("--model", default="models/pd_model.sav", help="Path to the saved model file relative to project root")
    predict_parser.add_argument("--input", default="data/loan_data_inputs_train.csv", help="CSV input file relative to project root")
    predict_parser.add_argument("--row", type=int, default=0, help="Row index to predict")
    predict_parser.set_defaults(func=action_predict)

    args = parser.parse_args()
    args.func(args)


if __name__ == "__main__":
    main()
