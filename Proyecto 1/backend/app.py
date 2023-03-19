import mysql.connector 
import traceback
from flask import Flask, jsonify
from flask.globals import request
from flask_cors import CORS

#Flask config
app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})

work = 1
rest = 1
change = True   # Es verdader si se desea actualizar el tiempo
penalizacion = 0
reset=False

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



@app.route('/datauser',methods=['POST'])
def data_user():
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
    
    
    return response
if __name__ == '__main__':
    app.run(threaded=True, port=5000,debug=True)

    



