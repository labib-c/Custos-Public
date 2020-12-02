import sentry_sdk
from flask import Flask, request
from sentry_sdk.integrations.flask import FlaskIntegration
import pyrebase
import os
import json
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

@app.route("/ping", methods=["GET"])
def ping():
    return "Success"

@app.route("/post_custos_scores", methods=["POST"])
def post_custos_scores():
    upload_data.upload_custos_scores()
    return "Success"

@app.route("/post_anomalies", methods=["POST"])
def post_anomalies():
    upload_data.upload_data()
    return "Success"

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=port)
