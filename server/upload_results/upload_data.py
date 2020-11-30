import pandas as pd
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

#Steps:
#1. Make .py file that generates a csv file with subsampled data and new anomaly column, and redteam dropped.
#2. Save data chunkwise to online

def upload_data():
    db.child("data").remove()
    for anomalous_data in pd.read_csv("anomalous_data.csv", chunksize=10):
        anomalous_data_json = anomalous_data.to_json(orient='records')
        anomalous_data_json = json.loads(anomalous_data_json)
        for example in anomalous_data_json:
            db.child("data").push(json.dumps(example))


#.py to generate anomalous_data.csv
#.py to generate background data
#function here to post background data