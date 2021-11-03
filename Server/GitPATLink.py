from flask import Flask, json,request,make_response,jsonify,redirect,render_template,session
import sqlite3
import requests
import os
import threading

requests.packages.urllib3.util.ssl_.DEFAULT_CIPHERS += "HIGH:!DH:!aNULL"
app = Flask(__name__)

@app.route("/link/admin")
def Admin():
    AdminID = request.args.get('ID', default = None, type = str)
    if not AdminID == "noko1024":
        return make_response("Error")
    
    conn = sqlite3.connect('GitPATLink.db')
    c = conn.cursor()
    c.execute("create table if not exists tableDB(ID txt primary key,PAT txt)")
    conn.commit()
    conn.close()

@app.route("/link/Add")
#PAT新規登録
def TokenAdd():
    conn = sqlite3.connect('GitPATLink.db')
    c = conn.cursor()
    
    userID = request.args.get('ID', default = None, type = str)
    PAT = request.args.get('PAT', default = None, type = str)
    if userID == None or PAT == None:
        return make_response("Error")

    
    
    conn.commit()
    conn.close()
    return make_response(userID)

@app.route("/link/Del")
def TokenDel():
    conn = sqlite3.connect('GitPATLink.db')
    c = conn.cursor()

    userID = request.args.get('ID', default = None, type = str)
    
    return make_response(userID)

@app.route("/link/Auth")
def TokenAuth():
    conn = sqlite3.connect('GitPATLink.db')
    c = conn.cursor()
    
    userID = request.args.get('ID', default = None, type = str)
    return make_response(userID)

port = int(os.environ.get("PORT", 5000))
app.run(host='0.0.0.0', port=80)