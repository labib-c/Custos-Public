import pandas as pd
from keras import models
import pyrebase
import json

AUTH_HEADERS = ["time","source user@domain","destination user@domain","source computer","destination computer","authentication type","logon type","authentication orientation","success/failure", "Redteam"]

config = {
    "apiKey": "AIzaSyDqRTPVxnozbD5GBacGS76CmsdWAlE4p9g",
    "authDomain": "custos-ae3f4.firebaseapp.com",
    "databaseURL": "https://custos-ae3f4.firebaseio.com",
    "storageBucket": "custos-ae3f4.appspot.com"
}
firebase = pyrebase.initialize_app(config)
db = firebase.database()

#take preproc data and run model on it. Take data above two thresholds and make anomalies that are above the highest threshold.
#Take subset of un processed data. Assign values and store in firebase.

def get_anomalies(data, preprocessed_data, threshold1, threshold2):
    pass

def upload_data():
    
    #Clear table
    db.child("data").remove()
    
    for i in pd.read_csv("data.csv", chunksize=10):
        anomalous_data = i
        break
    
    #threshold1 = get_threshold("data_preproc.csv", "model/model.h5", threshold_type="high")
    #threshold2 = get_threshold("data_preproc.csv", "model/model.h5", threshold_type="low")
    
    #anomalous_data = get_anomalies("data.csv", "data_preproc.csv", threshold1, threshold2)
    
    anomalies = [0]*10
    anomalies[0] = 1
    anomalies[5] = 1
    anomalous_data["Anomaly"] = anomalies
    anomalous_data = anomalous_data.drop(["Redteam"], axis=1)
    
    print(anomalous_data)
    #Upload data
    anomalous_data_json = anomalous_data.to_json(orient='records')
    
    print(anomalous_data_json)
    print(type(anomalous_data_json))
    anomalous_data_json = json.loads(anomalous_data_json)
    print(anomalous_data_json)
    print(type(anomalous_data_json))
    for i in anomalous_data_json:
        print(i)
        print(type(i))
        db.child("data").push(json.dumps(i))

if __name__ == "__main__":
    upload_data()