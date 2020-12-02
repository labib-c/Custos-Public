"""Preprocess Data."""
import argparse
import pandas as pd
from sklearn import preprocessing
import joblib
from keras.preprocessing.sequence import pad_sequences
import time

AUTH_HEADERS = ["time","source user@domain","destination user@domain","source computer","destination computer","authentication type","logon type","authentication orientation","success/failure", "Redteam"]
CHAR_INDEX = ']0abcdefghijklmnopqrstuvwxyz'
CHAR_INDEX +='ABCDEFGHIJKLMNOPQRSTUVWXYZ'
CHAR_INDEX += '123456789'
CHAR_INDEX += '().,-/+=&$?@#!*:;_[|%⸏{}\"\'' + ' ' +'\\'
CHAR_TO_FLOAT = dict((c, round(i / (len(CHAR_INDEX)-1), 2)) for i, c in enumerate(CHAR_INDEX))

PADDING_SIZES = {"source user@domain": 22, "destination user@domain": 22, "source computer": 6, "destination computer": 6}

def encode_sequence_list(seqs, col_name):
    padding_len = PADDING_SIZES[col_name]
    encoded_seqs = []
    counter = 0
    for seq in seqs:
        encoded_seq = [CHAR_TO_FLOAT[c] for c in seq]
        encoded_seqs.append(encoded_seq)
    return pad_sequences(encoded_seqs, padding='post', maxlen=padding_len, dtype="float32")

def preprocess_str_col(df, col_name):
    encoded_col = encode_sequence_list(df[col_name], col_name)
    col_names = []
    for i in range(len(encoded_col[0])):
        col_names.append(col_name + str(i))
    return pd.DataFrame(encoded_col, columns=col_names)

def preprocess_dataframe(df, load_scalers, scaler_folder="./scalers/"):
    preprocessed_df = pd.DataFrame({})
    for col_name in df.columns:
        if col_name == AUTH_HEADERS[0]:
            if load_scalers:
                scaler = joblib.load(scaler_folder + col_name + "_scaler.save")
            else:
                scaler = preprocessing.MinMaxScaler()
                scaler.fit(df[col_name].values.reshape((-1,1)))
            preprocessed_df[col_name] = scaler.transform(df[col_name].values.reshape((-1,1))).reshape(-1)
            if not load_scalers:
                joblib.dump(scaler, scaler_folder + col_name + "_scaler.save")
        elif col_name in AUTH_HEADERS[1:5]:
            preprocessed_col_df = preprocess_str_col(df, col_name)
            preprocessed_df = preprocessed_df.join(preprocessed_col_df)
        elif col_name == AUTH_HEADERS[-1]:
            preprocessed_df[col_name] = df[col_name]
        else:
            if load_scalers:
                if col_name != "success/failure":
                    scaler = joblib.load(scaler_folder + col_name + "_le.save")
                else:
                    scaler = joblib.load(scaler_folder + "success_failure_le.save")
            else:
                scaler = preprocessing.LabelEncoder()
                scaler.fit(df[col_name])
            preprocessed_df[col_name] = scaler.transform(df[col_name])
            if col_name != "success/failure" and not load_scalers:
                joblib.dump(scaler, scaler_folder + col_name + "_le.save")
            elif not load_scalers:
                joblib.dump(scaler, scaler_folder + "success_failure_le.save")
        df = df.drop([col_name], axis=1)
    return preprocessed_df

def save_preproc(csv_name, csv_name_write, load_scalers):
    df = pd.read_csv(csv_name)
    preproc_df = preprocess_dataframe(df, load_scalers)
    preproc_df.to_csv(csv_name_write, index=False)

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument('-i', '--input_file',
                        required=False,
                        type=str,
                        default="data.csv", 
                        dest="ifile",
                        metavar="<input file>",
                        help="Input csv file to be preprocessed." )
    parser.add_argument('-o', '--output_file',
                        required=False,
                        type=str,
                        default="preproc_data.csv", 
                        dest="ofile",
                        metavar="<output file>",
                        help="Output csv file to write preprocessed data to." )
    parser.add_argument('-l', '--load_scalers',
                        required=False,
                        type=bool,
                        default=False, 
                        dest="lscalers",
                        metavar="<load scalers>",
                        help="Whether to load scalers or generate new ones." )
    args = parser.parse_args()
    
    save_preproc(args.ifile, args.ofile, args.lscalers)
