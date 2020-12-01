import pandas as pd

def save_background_set(data_csv, background_csv, background_size=200):
    data = pd.read_csv(data_csv)
    background = data.sample(n=background_size).drop(["Redteam"], axis=1)
    background.to_csv(background_csv, index=False)

if __name__ == "__main__":
    save_background_set("../train_model/data.csv", "background.csv")