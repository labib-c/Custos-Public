import numpy as np
import pandas as pd
from keras import models

#Modify path to read parentdir
import os,sys,inspect
currentdir = os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe())))
parentdir = os.path.dirname(currentdir)
sys.path.insert(0,parentdir)

from train_model.inference import mean_squared_error, threshold_loss

def find_anomalies(preproc_csv, model, medium_multiple=10):
    num_red = 10
    data_loss = pd.Series()
    for chunk in pd.read_csv(preproc_csv, chunksize=19500):
        chunk = chunk.drop(["Redteam"], axis=1)
        chunk_prediction = model.predict(chunk, verbose=1)
        chunk_loss = mean_squared_error(chunk.values.tolist(), chunk_prediction)
        chunk_loss = pd.Series(chunk_loss)
        data_loss = pd.concat([data_loss, chunk_loss], ignore_index=True)
    medium_anomalies = threshold_loss(data_loss, num_red*medium_multiple)
    new_loss = data_loss[medium_anomalies]
    high_anomalies = threshold_loss(new_loss, num_red)
    return medium_anomalies, high_anomalies
    
def save_anomalies(data_csv, preproc_csv, model_file, data_save_csv):
    model = models.load_model(model_file)
    medium_anomalies, high_anomalies = find_anomalies(preproc_csv, model)
    data = pd.read_csv(data_csv)
    data = data.drop(["Redteam"], axis=1)
    data = data[medium_anomalies]
    data["Anomaly"] = high_anomalies
    data.to_csv(data_save_csv, index=False)

if __name__ == "__main__":
    save_anomalies("../train_model/data.csv", "../train_model/preproc_data.csv", "../train_model/model/model.h5", "anomalous_data.csv")
