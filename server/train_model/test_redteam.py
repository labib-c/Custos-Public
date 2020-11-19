import pandas as pd

REDTEAM_HEADERS = ["time","source user@domain","source computer","destination computer"]

redteam_full = pd.read_csv("redteam_full.csv")

redteam = pd.read_csv('redteam.txt.gz', names=REDTEAM_HEADERS)

time_match = redteam["time"].isin(redteam_full["time"])
source_domain_match = redteam["source user@domain"].isin(redteam_full["source user@domain"])
source_computer_match = redteam["source computer"].isin(redteam_full["source computer"])
dest_computer_match = redteam["destination computer"].isin(redteam_full["destination computer"])

in_red = pd.DataFrame({"time":time_match, "source user@domain": source_domain_match, "source computer": source_computer_match, "destination computer": dest_computer_match})
in_red = ~((in_red).all(axis=1))

print(redteam[in_red])