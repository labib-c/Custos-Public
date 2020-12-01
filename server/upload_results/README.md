This folder contains python files used to perform inference on the dataset using a newly trained model. The results are then uploaded to the firebase to be displayed on the website.

In order to properly run these functions, both subsample.py and preprocess.py must be run and the "data.csv" and "preproc_data.csv" files must be located in [train_model](../train_model/).

In order to perform proper inference, run find_anomalies.py.

Then, run the server locally by running the following two commands in [server](../):
docker build -t server:dev .
docker run -it --rm -v ./app -v /app/node_modules -p 5000:5000 -e CHOKIDAR_USEPOLLING=true server:dev

Finally, send a post request to /post_anomalies using:
curl -X POST localhost:5000/post_anomalies
