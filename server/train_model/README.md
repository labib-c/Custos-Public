This folder contains files used to train and test the model. In this case, an autoencoder is used.

To train a model, simply run the train_model.sh script.

The subsample.py file is used to subsample from the larger auth.txt.gz dataset with can be obtained from [data](https://csr.lanl.gov/data/cyber1/).
The preprocess.py file runs preprocessing on the subsampled data. In order to get information on arguments for this file, simply run python preprocess.py --help.
The train_autoencoder.py file is used to train the autoencoder.
The inference.py file is used to test the model.