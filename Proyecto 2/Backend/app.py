import mysql.connector
import traceback
from flask import Flask, jsonify
from flask import  make_response
from flask.globals import request
from flask_cors import CORS
import datetime
import pytz
#Flask config
app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})
# temp_in=0.00
# temp_out=0.00
# humidity=0
# water_percent=0

temp_in=10
temp_out=20
humidity=30
water_percent=40


time_irrigation=0
state=0

# ------------------- CONNECT WITH DATABASE:-------------------
conecction  = mysql.connector.connect(
    user='admin',
    password='password',
    host='proy2.cxrmksgpe29a.us-east-2.rds.amazonaws.com',
    database='proy2', 
    port='3306'
) 

#Crea el cursor para ejecutar las consultas
mycursor = conecction.cursor()
tz = pytz.timezone('America/Guatemala')
# ---------------------- Endpoints ----------------------
@app.route("/")
def index():
    return "<h1>Hi from backend, we are working hard!!</h1>"


# ---------------------- session data, return the actual state----------------------
@app.route('/data',methods=['POST'])
def session_data():
    global state,temp_in,temp_out,time_irrigation,humidity,water_percent
    #Se actualizan los datos de configuracion
    temp_in = float(request.json['tempIn'])
    temp_out = float(request.json['tempOut'])
    humidity = int(request.json['moisture'])
    water_percent=int(request.json['waterLevel'])
    now = datetime.datetime.now(tz =tz )
    print(temp_in,temp_out,humidity,water_percent)
    # Inserting the data to the db
    sql = '''INSERT INTO datos (fecha,state_bomba, time_irrigation,temp_externa,temp_interna,water_percent,humidity) 
        VALUES (%s,%s,%s,%s,%s,%s,%s)'''
    values= [now,state,time_irrigation,temp_out,temp_in,water_percent,humidity]
    # Intentando realizar la consulta
    try:
        with conecction.cursor() as cursor:
            cursor.executemany(sql, values)
            conecction.commit()
            response = {
                "state": "Perfect",
                "message": "data saved Successfully!!"
            }
        response =  {
            "state": state
        }
        return response
    except:
        traceback.print_exc()
        print('=====Error inserting data====')
        conecction.rollback()
        response = {
            "state": "Error",
            "message": "Ha ocurrido un error al insertar la data"
        }
        return response

@app.route('/button',methods=['POST'])
def activateButton():
    global state
    if state==0:
        state=1
    else:
        state=0
    return 'Changed state to: '+str(state)


# ---------------------- Return all data to frontend----------------------
@app.route('/get-data',methods=['GET'])
def get_data():
    global state,temp_in,temp_out,humidity,water_percent
    response =  {
        "tempIn": temp_in,
        "tempOut": temp_out,
        "humidity": humidity,
        "waterPercent": water_percent
    }

    return response


@app.route('/graph',methods=['POST'])
def graph():

    print('dateTime1',request.json['dateTime1'])
    print('dateTime2',request.json['dateTime2'])

    if request.json['graph'] == 1:
        print('graph 1')
    elif request.json['graph'] == 2:
        print('graph 2')
    elif request.json['graph'] == 3:
        print('graph 3')
    elif request.json['graph'] == 4:
        print('graph 4')
    elif request.json['graph'] == 5:
        print('graph 5')

    return 'llego'

@app.route('/set-time',methods=['POST'])
def set_time():
    global time_irrigation
    #Se actualizan los datos de configuracion
    time_irrigation = int(request.json['time'])
    return 'irrigation time changed to: '+str(time_irrigation)

@app.route('/water-percent',methods=['GET'])
def water_data():
    global water_percent,humidity
    response =  {
        "waterPercent": water_percent,
        "humidity": humidity,
    }
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response



if __name__ == '__main__':
    app.run(threaded=True, port=8000,debug=True, host='0.0.0.0')