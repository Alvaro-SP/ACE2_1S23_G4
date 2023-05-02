import mysql.connector
import traceback
from flask import Flask, jsonify
from flask import  make_response
from flask.globals import request
from flask_cors import CORS
import datetime
#Flask config
app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})

state=0

# ------------------- CONNECT WITH DATABASE:-------------------
conecction  = mysql.connector.connect(
    user='root',
    password='secret',
    host='localhost',
    database='p2', 
    port='3306'
) 

#Crea el cursor para ejecutar las consultas
mycursor = conecction.cursor()

# ---------------------- Endpoints ----------------------
@app.route("/")
def index():
    return "<h1>Hi from backend, we are working hard!!</h1>"


# ---------------------- session data, return the actual state----------------------
@app.route('/data',methods=['POST'])
def session_data():
    global state
    #Se actualizan los datos de configuracion
    temp_in = request.json['tempIn']
    temp_out = request.json['tempOut']
    humidity = request.json['moisture']
    water_percent=request.json['waterLevel']
    print(temp_in,temp_out,humidity,water_percent)
    response =  {
        "state": state
    }
    #response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/button',methods=['POST'])
def activateButton():
    global state
    if state==0:
        state=1
    else:
        state=0
    return 'Changed state to: '+str(state)



if __name__ == '__main__':
    app.run(threaded=True, port=8000,debug=True, host='0.0.0.0')