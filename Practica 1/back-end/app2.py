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
    mycursor.execute("SELECT * FROM Datos LIMIT 300;")
    myresult = mycursor.fetchall()
    return myresult

#Obtiene los datos más recientes
def get_latest_query():
    mycursor.execute("SELECT ID, Tipo, Valor FROM Datos WHERE ID IN ( SELECT MAX(ID) FROM Datos WHERE Tipo IN (1, 2, 3,4,5,6) GROUP BY Tipo);")
    myresult = mycursor.fetchall()
    return myresult

@app.route('/getAll',methods=['GET'])
def get_all_values():
    keys = ['ID', 'Temperatura', 'Presion', "Relativa", "Absoluta", "Velocidad", "Direccion"]
    data=getAllData()
    json_data = [dict(zip(keys, row)) for row in data]

    response = jsonify(json_data)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

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
    
    dir_value = 1
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

    try:
        sql = f"INSERT INTO Datos2 (temperatura, presion, relativa, absoluta, velocidad, direccion) VALUES ({temperature_parameter}, {pressure_parameter},{relative_parameter},{abs_parameter},{speed_parameter},{dir_value});"
        mycursor.execute(sql)
        return conecction.commit()


    except Exception:
        traceback.print_exc()
        print('Error al insertar los datos')
        return conecction.rollback()



    return response

#Pruebas de las funciones de la base de datos
if __name__ == '__main__':
    app.run(threaded=True, port=5000,debug=True)
