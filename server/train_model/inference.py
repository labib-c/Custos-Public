import pandas as pd
import numpy as np

from sklearn.metrics import confusion_matrix
from keras import models

def mean_squared_error(y_true, y_pred):
    loss = (y_true - y_pred)**2
    return np.mean(loss, axis=1)

def threshold_loss(data_loss, threshold_number):
    anomalies = data_loss.sort_values(ascending=False, ignore_index=True).head(threshold_number)
    threshold = anomalies.iloc[len(anomalies.index)-1]
    print(f"Loss is thresholded at {threshold}.")
    return data_loss >= threshold

def create_confusion(data, model):
    #Find true anomaly values.
    data_in = data.drop(["Redteam"], axis=1)
    
    num_red = data["Redteam"].sum()
    num_total = len(data.index)
    threshold_percent = num_red / num_total
    print(f"{threshold_percent}% of data is anomalous.")
    
    if num_red == 0:
        num_red = 1
    
    data_prediction = model.predict(data_in)
    data_loss = mean_squared_error(data_in.values.tolist(), data_prediction)
    data_loss = pd.Series(data_loss)
    predicted = threshold_loss(data_loss, num_red)
    y_true = data["Redteam"]
    
    return confusion_matrix(y_true, predicted)

def main(model_file="model/model.h5", data_csv="preproc_data.csv"):
    model = models.load_model(model_file)
    data = pd.read_csv(data_csv)
    
    confusion_matrix = create_confusion(data, model)
    print(confusion_matrix)

if __name__ == "__main__":
    main()
    