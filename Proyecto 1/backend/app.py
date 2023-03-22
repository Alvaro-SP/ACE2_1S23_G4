import mysql.connector
import traceback
from flask import Flask, jsonify
from flask.globals import request
from flask_cors import CORS
from src.Dashboard import dashboard
from src.GetSessions import getSessions

#Flask config
app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})

work = 1
rest = 1
change = True   # Es verdader si se desea actualizar el tiempo
penalizacion = []
reset=False
#* █████████████████████ CONNECT WITH DATABASE:█████████████████████
conecction  = mysql.connector.connect(
    user='root',
    password='',
    host='localhost',
    database='Proyecto1', 
    port='3306'
) 

#Crea el cursor para ejecutar las consultas
mycursor = conecction.cursor()


@app.route("/")
def index():
    return "<h1>Hi from backend, we are working hard!!</h1>"


@app.route('/data',methods=['POST'])
def hello():
    global work
    global rest
    global change
    global penalizacion
    print(request.json)

    if request.json["state"] == 0:   # Modo setup
        if change:
            change = False
            return jsonify({
                "type":"clock",
                "work":work,
                "rest":rest
            })
        else:
            work = request.json["time"]
            return jsonify({
                "type":"no_change"
            })
    else:                           # Modo trabajo
        penalizacion += request.json["button"]
        print(str(penalizacion) + " penalizaciones")
        return jsonify({
            "type":"work"
        })


@app.route('/datauser',methods=['POST'])
def data_user():
    global penalizacion
    execution = request.json['ejecucion']
    rest = request.json['descanso']
    user = request.json['username']
    user_id = get_user_id_by_username(user)
    # Se crea un nuevo usuario en el caso de que no exista
    if user_id is None:
        insert_new_user(user)
        user_id = get_user_id_by_username(user)
    # Formando la consulta
    sql = '''INSERT INTO sesion (ejecucion, descanso, usuario_idusuario) 
            VALUES (%s, %s, %s)'''
    values= [(int(execution), int(rest), int(user_id))]
    # Intentando realizar la consulta
    try:
        with conecction.cursor() as cursor:
            cursor.executemany(sql, values)
            conecction.commit()
            response = {
                "state": "Perfect",
                "message": "Sesión iniciada con éxito!!"
            }
            for i in range(8):
                penalizacion.append(0)
            return response
    except:
        traceback.print_exc()
        print('Error inserting new User')
        conecction.rollback()
        response = {
            "state": "Error",
            "message": "Ha ocurrido un error al insertar la sesión"
        }
        return response



    
@app.route('/reset',methods=['POST'])
def reset():
    global reset
    response = {}
    reset_param = request.json['reset']
    reset=bool(reset_param)
    
    response = {
        "state": "Perfect",
        "message": "Reseteo indicado con éxito"
    }
    return response

@app.route('/get-user-id',methods=['POST'])
def return_user_id():
    user = request.json['username']
    user_id = get_user_id_by_username(user)
    # Se manda None en caso no exista
    
    if user_id is None:
        response = {
            "id": None
        }
        return response
    else:
        response = {
            "id": user_id
        }
        return response
    
def get_user_id_by_username(name):
    with conecction.cursor() as cursor:
        cursor.execute("SELECT idusuario FROM usuario WHERE nombre = %s", (name,))
        myresult = cursor.fetchone()
        if myresult is not None:
            return myresult[0]
        else:
            return None


def insert_new_user(name):
    sql = '''INSERT INTO usuario (nombre) 
            VALUES (%s)'''
    values= [name]
    try:
        with conecction.cursor() as cursor:
            cursor.execute(sql, values)
            conecction.commit()
            print("usuario agregado!!")
    except:
        traceback.print_exc()
        print('Error inserting new User')
        conecction.rollback()
    
        
    
@app.route('/dashboard',methods=['GET'])
def return_dashboard():
    response = dashboard(conecction)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/get-for-graphs',methods=['POST'])
def return_session():
    response = getSessions(conecction, request)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

if __name__ == '__main__':
    app.run(threaded=True, port=5000,debug=True)

    



