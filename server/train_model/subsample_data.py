import pandas as pd
import time

COLUMNS_TO_REMOVE = ["time", "destination computer"] #Add more columns to reduce the size of the training set.
curr_time = time.time()
REDTEAM_HEADERS = ["time","source user@domain","source computer","destination computer"]
AUTH_HEADERS = ["time","source user@domain","destination user@domain","source computer","destination computer","authentication type","logon type","authentication orientation","success/failure"]

total_similar = 0
chunk_counter = 0
chunksize = 10**6
redteam = pd.read_csv('redteam.txt.gz', names=REDTEAM_HEADERS)
for chunk in pd.read_csv('auth.txt.gz', chunksize=chunksize, names=AUTH_HEADERS):
    #Check if row is in redteam data.
    temp_time = time.time()
    time_match = chunk["time"].isin(redteam["time"])
    source_domain_match = chunk["source user@domain"].isin(redteam["source user@domain"])
    source_computer_match = chunk["source computer"].isin(redteam["source computer"])
    dest_computer_match = chunk["destination computer"].isin(redteam["destination computer"])

    in_red = pd.DataFrame({"time":time_match, "source user@domain": source_domain_match, "source computer": source_computer_match, "destination computer": dest_computer_match})
    in_others = in_red.drop(columns=COLUMNS_TO_REMOVE).any(axis=1)
    total_similar += in_others.values.sum()
    data = chunk[in_others]
    in_red = in_red.all(axis=1)[in_others]

    data["Redteam"] = in_red.values.tolist()
    
    if chunk_counter == 0:
        data.to_csv("data.csv", index=False)
    elif not data.empty:
        data.to_csv("data.csv", mode='a', index=False, header=False)
    chunk_counter += 1
    print(f"Chunk number: {chunk_counter}. Read {chunk_counter*chunksize} number of lines. {total_similar} similar entries. Took total time of {time.time() - temp_time}.")
print(f"Total time taken: {time.time() - curr_time}")
