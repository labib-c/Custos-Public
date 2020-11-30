import pandas as pd
from keras import models

#Modify path to read parentdir
import os,sys,inspect
currentdir = os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe())))
parentdir = os.path.dirname(currentdir)
sys.path.insert(0,parentdir)

from train_model.inference import mean_squared_error, threshold_loss

def find_anomalies(preproc_data, model, medium_multiple=2):
    data_in = preproc_data.drop(["Redteam"], axis=1)
    num_red = preproc_data["Redteam"].sum()
    if num_red == 0:
        num_red = 1
    
    data_prediction = model.predict(data_in)
    data_loss = mean_squared_error(data_in.values.tolist(), data_prediction)
    data_loss = pd.Series(data_loss)
    
    medium_anomalies = threshold_loss(data_loss, num_red*medium_multiple)
    new_loss = data_loss[medium_anomalies]
    high_anomalies = threshold_loss(new_loss, num_red)
    return medium_anomalies, high_anomalies
    
def save_anomalies(data_csv, preproc_csv, model_file, data_save_csv):
    model = models.load_model(model_file)
    preproc_data = pd.read_csv(preproc_csv)
    print(preproc_data)
    medium_anomalies, high_anomalies = find_anomalies(preproc_data, model)
    print(high_anomalies)
    data = pd.read_csv(data_csv)
    data = data[medium_anomalies]
    data["Anomaly"] = high_anomalies
    
    anomalies.to_csv(data_save_csv, index=False)

if __name__ == "__main__":
    save_anomalies("../train_model/data.csv", "../train_model/preproc_data.csv", "../train_model/model/model.h5", "anomalous_data.csv")