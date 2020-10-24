import sentry_sdk
from flask import Flask, render_template
from sentry_sdk.integrations.flask import FlaskIntegration
import pyrebase
import os

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

@app.route("/test", methods=["GET"])
def hello():
    return {
        "response": "Hello World!"
    }

@app.route("/test_firebase_post_world", methods=["POST"])
def post_data():
    db.child("Hello").remove()

@app.route("/test_firebase_get", methods=["GET"])
def get_data():
    name = db.child("Hello").get()
    return name.val()

@app.route('/debug-sentry')
def trigger_error():
    division_by_zero = 1 / 0

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=port)