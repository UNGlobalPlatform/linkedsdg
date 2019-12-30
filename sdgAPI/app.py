#!flask/bin/python

from flask import Flask, request, abort
from tika import parser
from langdetect import detect
from flask_cors import CORS, cross_origin
import requests
import json
from os.path import join, dirname, realpath
import time
import re
import string
import os  
from werkzeug.utils import secure_filename


app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = './'
CORS(app)

@app.route('/file', methods=['POST'])
def get_task_file():
    response_obj = {} 
    if 'file' not in request.files:
        abort(400) 
     
    f = request.files['file']
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], secure_filename(f.filename))
    f.save(file_path)

    # TEXT EXTRACT
    url1 = 'http://linkedsdg.apps.officialstatistics.org/text/api'  
    files = {'file': open(file_path, 'rb')} 
    r1 = requests.request("POST", url1, files=files) 
    os.remove(file_path)  
     
    response_obj["text"] = r1.json() 

    url2 = 'http://linkedsdg.apps.officialstatistics.org/concepts/api'
    payload2 = json.dumps(response_obj["text"])
    headers2 = {'Content-type': 'application/json'} 
    r2 = requests.request("POST", url2, data=payload2, headers=headers2)
    
    response_obj["concepts"] = r2.json()

    url3 = "http://linkedsdg.apps.officialstatistics.org/graph/api"
    payload3 = json.dumps(response_obj["concepts"]['concepts'])
    r3 = requests.request("POST", url3, data=payload3, headers=headers2)
    
    response_obj["graph"] = r3.json()

    return json.dumps(response_obj)


@app.route('/url', methods=['POST'])
def get_task_url():
    response_obj = {}  

    # TEXT EXTRACT
    url = 'http://linkedsdg.apps.officialstatistics.org/text/apiURL' 
    payload = str(request.data, "utf-8")
    r1 = requests.request("POST", url, data=payload)
 
    response_obj["text"] = r1.json()

    url2 = 'http://linkedsdg.apps.officialstatistics.org/concepts/api'
    payload2 = json.dumps(response_obj["text"])
    headers2 = {'Content-type': 'application/json'} 
    r2 = requests.request("POST", url2, data=payload2, headers=headers2)
    
    response_obj["concepts"] = r2.json()

    url3 = "http://linkedsdg.apps.officialstatistics.org/graph/api"
    payload3 = json.dumps(response_obj["concepts"]['concepts'])
    r3 = requests.request("POST", url3, data=payload3, headers=headers2)
    
    response_obj["graph"] = r3.json()

    return json.dumps(response_obj)


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5002, debug=False)
