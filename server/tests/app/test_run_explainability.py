import numpy as np
import pandas as pd

import server.run_explainability.explainability as explainability

def test_get_error():
    custos_calculator = explainability.CustosScore(model_file="./server/train_model/model/model.h5")
    example_df = pd.DataFrame({"col1": [1], "col2": [0]})
    prediction = pd.DataFrame({"col1": [1], "col2": [1]})
    error_df, total_error = custos_calculator.get_error(example_df, prediction)
    true_error_df = pd.DataFrame({"col_name": ["col2", "col1"], "error": [1, 0]})
    true_error_df.index = [1,0]
    
    assert (total_error == 0.5).all()
    assert (error_df == true_error_df).all().all()

def test_split_shap():
    custos_calculator = explainability.CustosScore(model_file="./server/train_model/model/model.h5")
    sign = pd.DataFrame({"col1": [True], "col2": [False]})
    shap_values = np.array([[1],[-1]])
    feature_names = ["col1", "col2"]
    split_custos_scores = custos_calculator.split_shap(sign, shap_values, feature_names)
    real_scores = np.array([[-1],[-1]])
    
    assert (split_custos_scores == real_scores).all()
