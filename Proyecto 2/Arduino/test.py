import mysql.connector 
import traceback
from flask import Flask, jsonify
from flask.globals import request
from flask_cors import CORS
import json

#Flask config
app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})

activate = 0

@app.route('/')
def index():
    print(request)
    return 'Hello, World!'


@app.route('/data',methods=['POST'])
def sendData():
    global activate 
    print(request.json)
    return  jsonify({
                "state":activate
            })

    
@app.route('/button',methods=['POST'])
def activateButton():
    global activate 
    if activate == 0:
        activate = 1
    else:
        activate = 0
    return 'Changed state to: ' + str(activate)



#Pruebas de las funciones de la base de datos
if __name__ == '__main__':
    app.run(threaded=True, port=8000,debug=True, host='192.168.0.16')
