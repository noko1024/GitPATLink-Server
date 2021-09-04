from logging import debug
from flask import Flask, json,request,make_response,jsonify,redirect,render_template,session
import sqlite3
import requests

requests.packages.urllib3.util.ssl_.DEFAULT_CIPHERS += "HIGH:!DH:!aNULL"
app = Flask(__name__)

@app.route("/link/Add")
#PAT新規登録
def TokenAdd():
    userID = request.args.get('ID', default = None, type = str)
    PAT = request.args.get('PAT', default = None, type = str)
    return make_response(userID)

@app.route("/link/Del")
def TokenDel():
    userID = request.args.get('ID', default = None, type = str)
    return make_response(userID)

@app.route("/link/Auth")
def TokenAuth():
    userID = request.args.get('ID', default = None, type = str)
    return make_response(userID)


app.run()