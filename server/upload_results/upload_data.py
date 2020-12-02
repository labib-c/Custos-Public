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

def upload_data():
    db.child("data").remove()
    anomalous_data = pd.read_csv("./upload_results/anomalous_data.csv")
    anomalous_data_json = anomalous_data.to_json(orient='records')
    anomalous_data_json = json.loads(anomalous_data_json)
    for example_index in range(len(anomalous_data_json)):
        db.child("data").child(str(example_index)).set(json.dumps(anomalous_data_json[example_index]))

def upload_custos_scores():
    db.child("custos_score").remove()
    custos_scores = pd.read_csv("./upload_results/custos_scores.csv", index_col=0)
    custos_scores_index = custos_scores.index
    custos_scores_json = custos_scores.to_json(orient='records')
    custos_scores_json = json.loads(custos_scores_json)
    for example_index in range(len(custos_scores_json)):
        example_save_index = custos_scores_index[example_index]
        db.child("custos_score").child(str(example_save_index)).set(json.dumps(custos_scores_json[example_index]))
