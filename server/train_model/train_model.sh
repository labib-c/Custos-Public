#!/bin/sh
python subsample_data.py
python preprocess.py
python train_autoencoder.py