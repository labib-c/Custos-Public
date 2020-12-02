from keras import models
import pandas as pd

from server.upload_results.find_anomalies import find_anomalies

def test_find_anomalies():
    preproc_csv = pd.read_csv("./server/tests/app/test_point.txt")
    model = models.load_model("./server/train_model/model/model.h5")
    medium_anomalies, high_anomalies = find_anomalies(preproc_csv, model, medium_multiple=1, num_red=1)
    assert (medium_anomalies == [True]).all()
    assert (high_anomalies == [True]).all()
