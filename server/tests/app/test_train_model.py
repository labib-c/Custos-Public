import numpy as np
import pandas as pd

from server.train_model.inference import mean_squared_error, threshold_loss
from server.train_model.preprocess import encode_sequence_list, preprocess_str_col, preprocess_dataframe
from server.train_model.train_autoencoder import get_model

def test_error():
    y_true = np.array([[0, 1],[1, 0]])
    y_pred = np.array([[1,0],[1,0]])
    error = mean_squared_error(y_true, y_pred)
    assert (np.array([1,0]) == error).all()

def test_error_perfect():
    y_true = np.array([[0, 1],[1, 0]])
    y_pred = np.array([[0,1],[1,0]])
    error = mean_squared_error(y_true, y_pred)
    assert (np.array([0,0]) == error).all()

def test_threshold():
    data = pd.Series([2,1,3])
    print(data)
    threshold_number = 2
    thresholded = threshold_loss(data, threshold_number)
    assert (thresholded == [True, False, True]).all()
    
def test_encode_sequence_list():
    seqs = ["]]]"]
    col_name = "source computer"
    encoded_seqs = encode_sequence_list(seqs, col_name)
    assert (encoded_seqs == [[0,0,0,0,0,0]]).all()

def test_preprocess_str_col():
    df = pd.DataFrame({"source computer": ["]]]"]})
    col_name = "source computer"
    encoded_df = preprocess_str_col(df, col_name)
    true_df = pd.DataFrame({"source computer0": [0], "source computer1": [0], "source computer2": [0], "source computer3": [0], "source computer4": [0], "source computer5": [0]})
    assert (encoded_df == true_df).all().all()

def test_preprocess_dataframe():
    df = pd.DataFrame({"Redteam": [True], "source computer": ["]]]"]})
    preprocessed_df = preprocess_dataframe(df, False)
    true_df = pd.DataFrame({"Redteam": [True], "source computer0": [0], "source computer1": [0], "source computer2": [0], "source computer3": [0], "source computer4": [0], "source computer5": [0]})
    assert (preprocessed_df == true_df).all().all()

def test_preprocess_dataframe2():
    df = pd.DataFrame({"Redteam": [False], "source computer": ["]]]"]})
    preprocessed_df = preprocess_dataframe(df, False)
    true_df = pd.DataFrame({"Redteam": [False], "source computer0": [0], "source computer1": [0], "source computer2": [0], "source computer3": [0], "source computer4": [0], "source computer5": [0]})
    assert (preprocessed_df == true_df).all().all()

def test_get_model():
    input_shape = 1
    dim_hid1 = 1
    dim_hid2 = 1
    dim_hid3 = 1
    learning_rate = 0.001
    activation = "relu"
    model = get_model(input_shape, dim_hid1, dim_hid2, dim_hid3, learning_rate, activation)
    input_shape_result = model.input_shape
    print(input_shape_result)
    assert (input_shape_result[1] == input_shape)