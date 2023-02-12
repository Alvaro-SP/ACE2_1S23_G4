import mysql.connector
from flask import Flask
from flask_cors import CORS
import json
import random
import time
conecction  = mysql.connector.connect(
    user='root',
    password='2412',
    host='localhost',
    database='Practica1',
    port='3306'
)

#Crea el cursor para ejecutar las consultas
mycursor = conecction.cursor()

# Tipos:
# 1 = Temperatura
# 2 = Humedad
# 3 = Velcidad del viento
# 4 = Direccion del viento
# 5 = Presion barometriva


#Obtiene todos los datos de la tabla
def getAllData():
    mycursor.execute("SELECT * FROM datos")
    myresult = mycursor.fetchall()
    return myresult

#Valida que el noType este entre 1 y 5 y llama a la funcion getQuery
def getData(noType):
    return  getQuery(noType) if noType > 0 and noType < 7 else []

#Obtiene los datos de la tabla segun el noType
def getQuery(noType):
    mycursor.execute(f"SELECT * FROM datos WHERE tipo = {noType};")
    myresult = mycursor.fetchall()
    return myresult

#Obtiene los datos más recientes
def get_latest_query():
    mycursor.execute("SELECT ID, Tipo, Valor FROM Practica1.Datos WHERE ID IN ( SELECT MAX(ID) FROM Practica1.Datos WHERE Tipo IN (1, 2, 3,4,5,6) GROUP BY Tipo);")
    myresult = mycursor.fetchall()
    return myresult

#Valida que el noType este entre 1 y 5 y llama a la funcion insertQuery
def insertData(noType, value):
    return  insertQuery(noType,value) if noType > 0 and noType < 6 else []

#Inserta los datos en la tabla segun el noType
def insertQuery(noType, value):
    try:
        mycursor.execute(f"INSERT INTO datos (tipo, valor) VALUES ({noType}, {value});")
        return conecction.commit()

    except:
        print('Error al insertar los datos')
        return conecction.rollback()


#Flask config
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})
app.debug = True

@app.route("/")
def index():
    return "<h1>Ruta Principal 14k</h1>"

@app.route('/get-all-temperature-data',methods=['GET'])
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
    print(json_data)
    return json.dumps(json_data)

@app.route('/get-all-wind-speed-data',methods=['GET'])
def get_wind_speed_data():
    keys = ['ID', 'Tipo', 'Valor']
    data=getData(3)
    json_data = [dict(zip(keys, row)) for row in data]
    # Emite un evento personalizado llamado "update" con los datos actualizados
    # socketio.emit('updatespeed', json_data)
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

@app.route('/get-all-absoulute-humidity-data',methods=['GET'])
def get_absolute_humidity_data():
    keys = ['ID', 'Tipo', 'Valor']
    data=getData(6)
    json_data = [dict(zip(keys, row)) for row in data]
    return json.dumps(json_data)

@app.route('/get-latest-data',methods=['GET'])
def get_latest_data():
    keys = ['ID', 'Tipo', 'Valor']
    data=get_latest_query()
    json_data = [dict(zip(keys, row)) for row in data]
    return json.dumps(json_data)


#Pruebas de las funciones de la base de datos
if __name__ == '__main__':
    app.run(threaded=True, port=5000,debug=True)
    # socketio.run(app, host="0.0.0.0")
    '''print('Hello, world!')
    print(conecction)

    print('----SELECT----')
    print('all data',getAllData())
    print('temperature',getData(1))
    print('Humedad',getData(2))
    print('Velcidad del viento',getData(3))
    print('Direccion del viento',getData(4))
    print('Presion barometriva',getData(5))'''

    print('----INSERT INTO----')
    #print('temperature',insertData(1,7))
    #print('Humedad',insertData(2,7))
    #print('Velcidad del viento',insertData(3,7))
    #print('Direccion del viento',insertData(4,7))
    #print('Presion barometriva',insertData(5,7))
    #print('all data',getAllData())