import numpy as np
import pandas as pd

from sklearn.model_selection import train_test_split
from keras import Model
from keras.layers import Dense, Input
from keras.optimizers import Adam
from keras.models import model_from_json
from keras.callbacks import EarlyStopping

def get_model(input_shape, dim_hid1, dim_hid2, dim_hid3, learning_rate, activation):
    input_layer = Input(shape = (input_shape,))
    hid_layer1 = Dense(dim_hid1, activation = activation, name = 'hid_layer1')(input_layer)
    hid_layer2 = Dense(dim_hid2, activation = activation, name = 'hid_layer2')(hid_layer1)
    hid_layer3 = Dense(dim_hid3, activation = activation, name = 'hid_layer3')(hid_layer2)
    output_layer = Dense(input_shape)(hid_layer3)
    model = Model(inputs = input_layer, outputs = output_layer)
    optimizer = Adam(lr = learning_rate)
    model.compile(optimizer = optimizer, loss = 'mean_squared_error')
    return model

def train_model(data_csv, callbacks, model_save="model/model.h5", num_epochs=100, batch_size=128, dim_hid1=30, dim_hid2=20, dim_hid3=30, learning_rate=0.01, activation="relu"):
    data = pd.read_csv(data_csv)
    print(data)
    X_train, X_test = train_test_split(data, test_size=0.2, random_state=42)
    
    model = get_model(X_train.shape[1], dim_hid1, dim_hid2, dim_hid3, learning_rate, activation)
    print("here")
    print(X_train)
    model.fit(x = X_train, y = X_train, batch_size = batch_size, shuffle = True, epochs = num_epochs, validation_data = [X_test, X_test], callbacks = callbacks)
    
    model.save(model_save)
    
if __name__ == "__main__":
    callbacks = [EarlyStopping(monitor='val_loss', min_delta=0.01, patience=5)]
    train_model("preproc_data.csv", callbacks)
