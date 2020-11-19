"""Preprocess Data."""
import pandas as pd
from sklearn import preprocessing
import joblib
from keras.preprocessing.sequence import pad_sequences
import time

AUTH_HEADERS = ["time","source user@domain","destination user@domain","source computer","destination computer","authentication type","logon type","authentication orientation","success/failure"]
CHAR_INDEX = ']0abcdefghijklmnopqrstuvwxyz'
CHAR_INDEX +='ABCDEFGHIJKLMNOPQRSTUVWXYZ'
CHAR_INDEX += '123456789'
CHAR_INDEX += '().,-/+=&$?@#!*:;_[|%⸏{}\"\'' + ' ' +'\\'
CHAR_TO_INT = dict((c, i) for i, c in enumerate(CHAR_INDEX))

def encode_sequence_list(seqs):
    encoded_seqs = []
    counter = 0
    for seq in seqs:
        encoded_seq = [CHAR_TO_INT[c] for c in seq]
        encoded_seqs.append(encoded_seq)
    return pad_sequences(encoded_seqs, padding='post')

def preprocess_str_col(df, col_name):
    encoded_col = encode_sequence_list(df[col_name])
    col_names = []
    for i in range(len(encoded_col[0])):
        col_names.append(col_name + str(i))
    return pd.DataFrame(encoded_col, columns=col_names)

def preprocess_dataframe(csv_name, csv_name_write):
    df = pd.read_csv(csv_name)
    preprocessed_df = pd.DataFrame({})
    for col_name in AUTH_HEADERS:
        if col_name == AUTH_HEADERS[0]:
            scaler = preprocessing.MinMaxScaler()
            preprocessed_df[col_name] = scaler.fit_transform(df[col_name].values.reshape((-1,1))).reshape(-1)
            joblib.dump(scaler, "./scalers/" + col_name + "_scaler.save")
        elif col_name in AUTH_HEADERS[1:5]:
            preprocessed_col_df = preprocess_str_col(df, col_name)
            preprocessed_df = preprocessed_df.join(preprocessed_col_df)
        else:
            scaler = preprocessing.LabelEncoder()
            preprocessed_df[col_name] = scaler.fit_transform(df[col_name])
            if col_name != AUTH_HEADERS[-1]:
                joblib.dump(scaler, "./scalers/" + col_name + "_le.save")
            else:
                joblib.dump(scaler, "./scalers/" + "success_failure_le.save")
        df = df.drop([col_name], axis=1)
    print(preprocessed_df)
    preprocessed_df.to_csv(csv_name_write, index=False)

if __name__ == "__main__":
    preprocess_dataframe("data.csv", "preproc_data.csv")
