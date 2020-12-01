import sentry_sdk
from flask import Flask, render_template
from sentry_sdk.integrations.flask import FlaskIntegration
import pyrebase
import os
import upload_results.upload_data as upload_data

sentry_sdk.init(
    dsn="https://5dbbf50c14ee4124ad7a7e5124be414a@o358880.ingest.sentry.io/5450618",
    integrations=[FlaskIntegration()],
    traces_sample_rate=1.0
)

app = Flask(__name__)
port = int(os.environ.get("PORT", 5000))

config = {
    "apiKey": "AIzaSyDqRTPVxnozbD5GBacGS76CmsdWAlE4p9g",
    "authDomain": "custos-ae3f4.firebaseapp.com",
    "databaseURL": "https://custos-ae3f4.firebaseio.com",
    "storageBucket": "custos-ae3f4.appspot.com"
}
firebase = pyrebase.initialize_app(config)
db = firebase.database()

@app.route("/get_custos_scores/<id_number>", methods=["GET"])
def get_custos_score(id_number):
    data_anomaly = db.child("data").get(id_number)
    
    return data_anomaly

@app.route("/post_anomalies", methods=["POST"])
def post_anomalies():
    upload_data.upload_data()
    return "Success"

@app.route("/post_background", methods=["POST"])
def post_background():
    upload_data.upload_background()
    return "Success"

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=port)
    