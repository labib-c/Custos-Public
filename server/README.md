This folder contains all files used to run the backend of the website and to train the model.

The file app.py runs the main backend.

The folder [train_model](./train_model/) contains files to train the model. Information on this folder's files can be found [here](./train_model/README.md).

The folder [upload_results](./upload_results/) contains files to perform inference using the model and upload said results to the firebase. The firebase is linked to the website which displays these results.
Information on this folder's files can be found [here](./upload_results/README.md).

The folder [run_explainability](./run_explainability) contains files to calculate custos scores for the anomalous data found in [upload_results](./upload_results/).
