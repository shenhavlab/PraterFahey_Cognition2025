import sqlite3
import json
import pandas as pd
import sys
from datetime import date
import os


conn = sqlite3.connect(sys.argv[1])
cur = conn.cursor()
cur.execute("select uniqueid, codeversion, status, mode, datastring from " + sys.argv[2] + ";")
results = cur.fetchall()




statuses = [3,4,5,7]
exclude = []
data = []



for row in results:
	if row[2] in statuses and row[0] not in exclude and row[1] == sys.argv[3]:
		if row[4]:
			data.append(row[4])

data = [json.loads(part)['data'] for part in data]



for part in data:
    for record in part:
        record['trialdata']['uniqueid'] = record['uniqueid']




today = date.today()
d1 = today.strftime("%Y-%m-%d")

if not os.path.exists(d1):
	os.mkdir(d1)

data = [record['trialdata'] for part in data for record in part]

if len(data) > 0:
	data_frame = pd.DataFrame(data)
	data_frame = data_frame.loc[data_frame['phase'] == 'MainBlock',]
	data_frame.drop(['action','indexOf','status','template','templates','viewTime'],axis=1,inplace=True)
	data_frame.to_csv(d1 + '/trialdata_' + sys.argv[2] + '_'+d1+'.csv',index=False)