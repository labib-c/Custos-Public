import json
import pandas as pd
import numpy as np
from keras import models
import shap

#Modify path to read parentdir
import os,sys,inspect
currentdir = os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe())))
parentdir = os.path.dirname(currentdir)
sys.path.insert(0,parentdir)
from train_model.preprocess import preprocess_dataframe, PADDING_SIZES, AUTH_HEADERS

class CustosScore:
    def __init__(self, model_file="./train_model/model/model.h5"):
        self.model = models.load_model(model_file)
        self.feature_num = 0

    def _predict(self, example):
        return self.model.predict(example)[:,self.feature_num]
    
    def get_error(self, example_df, prediction):
        square_errors = np.power(example_df - prediction, 2)
        errors_df = square_errors.T.reset_index()
        errors_df.columns = ["col_name", "error"]
        total_mse = np.mean(errors_df["error"])
        errors_df.sort_values(by="error", ascending=False, inplace=True)
        return errors_df, total_mse
    
    def split_shap(self, sign, shap_values, feature_names):
        shap_values_sign = []
        for i in range(len(shap_values)):
            feature_name = feature_names[i]
            if sign[feature_name].any():
                offsetting = shap_values[i] > 0
            else:
                offsetting = shap_values[i] < 0
            shap_values_abs = np.fabs(shap_values[i])
            shap_values_temp = -1*(shap_values_abs*offsetting)
            shap_values_temp += (shap_values_abs*(~offsetting))
            shap_values_sign.append(shap_values_temp)
        return np.array(shap_values_sign)
    
    def get_custos_score(self, example_df, background_df, num_features=5):
        prediction = self.model.predict(example_df)[0]
        error_df, total_mse = self.get_error(example_df, prediction)

        #Calculate shap values for worst features
        all_shap_values = []
        top_error_df = error_df.head(num_features)
        for i in range(num_features):
            self.feature_num = top_error_df.index[i]
            explainer = shap.KernelExplainer(self._predict, background_df.values)
            feature_shap_values = explainer.shap_values(example_df, nsamples='auto')[0]
            all_shap_values.append(feature_shap_values)
        all_shap_values = np.array(all_shap_values)

        #Assign offsetting features
        all_shap_values = self.split_shap(example_df > prediction, all_shap_values, top_error_df["col_name"].values)
        
        #Concatenate features
        final_shap_vals = np.mean(all_shap_values, axis=0)
        final_shap_vals = pd.DataFrame([final_shap_vals], columns=example_df.columns)
        
        #Concatenate related features
        final_shap_vals_df = pd.DataFrame()
        for col_name in AUTH_HEADERS[:-1]:
            if col_name in AUTH_HEADERS[1:5]:
                final_shap_vals_df[col_name] = np.mean(final_shap_vals.loc[:, col_name+"0":col_name+str(PADDING_SIZES[col_name]-1)].values)
            else:
                final_shap_vals_df[col_name] = final_shap_vals.loc[:,col_name]
        return final_shap_vals_df
    
def get_all_scores(anomalies_csv, background_csv, model_file, data_save_csv):
    custos_scoring = CustosScore(model_file=model_file)
    background_df = pd.read_csv(background_csv)
    example_df = pd.read_csv(anomalies_csv).drop(["Anomaly"], axis=1)
    example_df = preprocess_dataframe(example_df, load_scalers=True, scaler_folder="../train_model/scalers/")
    background_df = preprocess_dataframe(background_df, load_scalers=True, scaler_folder="../train_model/scalers/")

    custos_scores = pd.DataFrame()
    for index, row in example_df.iterrows():
        custos_scores_example = custos_scoring.get_custos_score(pd.DataFrame(row).T, background_df)
        custos_scores = pd.concat([custos_scores, custos_scores_example], ignore_index=True)
        print(custos_scores)
    custos_scores.to_csv(data_save_csv, index=False)
    
if __name__ == "__main__":
    get_all_scores("../upload_results/anomalous_data.csv", "../upload_results/background.csv", "../train_model/model/model.h5", "../upload_results/custos_scores.csv")
