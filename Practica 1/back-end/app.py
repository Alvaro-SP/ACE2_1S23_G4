import mysql.connector 
import traceback
from flask import Flask, jsonify
from flask.globals import request
from flask_cors import CORS
import json

#Flask config
app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})


conecction  = mysql.connector.connect(
    user='root',
    password='secret',
    host='localhost',
    database='Practica1', 
    port='3306'
) 

#Crea el cursor para ejecutar las consultas
mycursor = conecction.cursor()

#Tipos:
# 1 = Temperatura
# 2 = Humedad relativa
# 3 = Humedad absoluta
# 4 = Velcidad del viento
# 5 = Direccion del viento
# 6 = Presion barometrica



#Obtiene todos los datos de la tabla
def getAllData():
    mycursor.execute("SELECT * FROM Datos LIMIT 600;")
    myresult = mycursor.fetchall()
    return myresult

#Valida que el noType este entre 1 y 5 y llama a la funcion getQuery
def getData(noType):
    return  getQuery(noType) if noType > 0 and noType < 7 else []

#Obtiene los datos de la tabla segun el noType
def getQuery(noType):
    mycursor.execute(f"SELECT * FROM Datos WHERE tipo = {noType};")
    myresult = mycursor.fetchall()
    return myresult

#Obtiene los datos más recientes
def get_latest_query():
    mycursor.execute("SELECT ID, Tipo, Valor FROM Datos WHERE ID IN ( SELECT MAX(ID) FROM Datos WHERE Tipo IN (1, 2, 3,4,5,6) GROUP BY Tipo);")
    myresult = mycursor.fetchall()
    return myresult

#Valida que el noType este entre 1 y 6 y llama a la funcion insertQuery
def insertData(noType, value):
    return  insertQuery(noType,value) if noType > 0 and noType < 7 else []

#Inserta los datos en la tabla segun el noType
def insertQuery(noType, value):
    try:
        sql = f"INSERT INTO Datos (tipo, valor) VALUES ({noType}, {value});"
        mycursor.execute(sql)
        return conecction.commit()


    except Exception:
        traceback.print_exc()
        print('Error al insertar los datos')
        return conecction.rollback()

'''@app.route('/get-all-temperature-data',methods=['GET'])
def get_temperature_data():
    keys = ['ID', 'Tipo', 'Valor']
    data=getData(1)
    json_data = [dict(zip(keys, row)) for row in data]
    return json.dumps(json_data)

@app.route('/get-all-humidity-data',methods=['GET'])
def get_humidity_data():
    keys = ['ID', 'Tipo', 'Valor']
    data=getData(2)
    json_data = [dict(zip(keys, row)) for row in data]
    return json.dumps(json_data)

@app.route('/get-all-wind-speed-data',methods=['GET'])
def get_wind_speed_data():
    keys = ['ID', 'Tipo', 'Valor']
    data=getData(3)
    json_data = [dict(zip(keys, row)) for row in data]
    return json.dumps(json_data)

@app.route('/get-all-wind-direction-data',methods=['GET'])
def get_wind_direction_data():
    keys = ['ID', 'Tipo', 'Valor']
    data=getData(4)
    json_data = [dict(zip(keys, row)) for row in data]
    return json.dumps(json_data)

@app.route('/get-all-barometric-pressure-data',methods=['GET'])
def get_barometric_pressure_data():
    keys = ['ID', 'Tipo', 'Valor']
    data=getData(5)
    json_data = [dict(zip(keys, row)) for row in data]
    return json.dumps(json_data)
'''

# @app.route('/getHumadityAbsolute',methods=['GET'])
# def get_absolute_pressure_data():
#     keys = ['ID', 'Tipo', 'Valor']
#     data=getData(6)
#     json_data = [dict(zip(keys, row)) for row in data]
    
#     response = jsonify(json_data)
#     response.headers.add('Access-Control-Allow-Origin', '*')
#     return response


@app.route('/getAll',methods=['GET'])
def get_all_values():
    keys = ['ID', 'Tipo', 'Valor']
    data=getAllData()
    json_data = [dict(zip(keys, row)) for row in data]

    response = jsonify(json_data)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


# @app.route('/get-latest-data',methods=['GET'])
# def get_latest_data():
#     keys = ['ID', 'Tipo', 'Valor']
#     data=get_latest_query()
#     json_data = [dict(zip(keys, row)) for row in data]

#     response = jsonify(json_data)
#     response.headers.add('Access-Control-Allow-Origin', '*')
#     return response
   

# @app.route('/get-all-data',methods=['GET'])
# def get_all_values():
#     # Matrix with all data
#     data_matrix=[]

#     # Temperature Data
#     temperature_keys=['ID', 'Tipo', 'Valor']
#     temperature_data=getData(1)
#     temperature_json = [dict(zip(temperature_keys, row)) for row in temperature_data]
#     data_matrix.append((temperature_json))
#     #======================================================================================
#     # Relative Humidity Data
#     rel_humiduty_keys=['ID', 'Tipo', 'Valor']
#     rel_humiduty_data=getData(2)
#     rel_humiduty_json = [dict(zip(rel_humiduty_keys, row)) for row in rel_humiduty_data]
#     data_matrix.append((rel_humiduty_json))
#     #======================================================================================
#     # Absolute Humidity Data
#     abs_humiduty_keys=['ID', 'Tipo', 'Valor']
#     abs_humiduty_data=getData(3)
#     abs_humiduty_json = [dict(zip(abs_humiduty_keys, row)) for row in abs_humiduty_data]
#     data_matrix.append((abs_humiduty_json))
#     #======================================================================================
#     # Wind Speed Data
#     wind_speed_keys=['ID', 'Tipo', 'Valor']
#     wind_speed_data=getData(4)
#     wind_speed_json = [dict(zip(wind_speed_keys, row)) for row in wind_speed_data]
#     data_matrix.append((wind_speed_json))
#     #======================================================================================
#     # Wind Direction Data
#     wind_dir_keys=['ID', 'Tipo', 'Valor']
#     wind_dir_data=getData(5)
#     wind_dir_json = [dict(zip(wind_dir_keys, row)) for row in wind_dir_data]
#     data_matrix.append((wind_dir_json))
#     #======================================================================================
#     # Barometric Pressure Data
#     pressure_keys=['ID', 'Tipo', 'Valor']
#     pressure_data=getData(6)
#     pressure_json = [dict(zip(pressure_keys, row)) for row in pressure_data]
#     data_matrix.append((pressure_json))
#     #======================================================================================
#     return data_matrix


@app.route('/insert-data',methods=['POST'])
def insert_new_data():
    print("Valores a agregar",request.json)    
    response = {}
    temperature_parameter = request.json['temperatura']
    pressure_parameter = request.json['presion']
    abs_parameter = request.json['humedadA']
    relative_parameter = request.json['humedadR']
    speed_parameter = request.json['velocidad']
    direction_parameter = request.json['direccion']
    insertData(1,float(temperature_parameter))
    insertData(2,float(relative_parameter))
    insertData(3,float(abs_parameter))
    insertData(4,float(speed_parameter))
    insertData(6,float(pressure_parameter))
    #N, NE, E, SE, E, SW, W, NW
    direction_values = {
        "N": 1,
        "NE":2,
        "E": 3,
        "SE":4,
        "S": 5,
        "SW":6,
        "W": 7,
        "NW":8,
    }

    if(direction_parameter in direction_values):
        dir_value= direction_values[direction_parameter]
        insertData(5,float(dir_value))
    response = {
        "state": "perfect",
        "message": "Datos ingresados con éxito"
    }
    return response

#Pruebas de las funciones de la base de datos
if __name__ == '__main__':
    app.run(threaded=True, port=5000,debug=True)
