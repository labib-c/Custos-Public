from flask import Flask, render_template
app = Flask(__name__)

@app.route("/test", methods=["GET"])
def hello():
    return {
        "response": "Hello World!"
    }

if __name__ == '__main__':
    app.run(host='0.0.0.0')