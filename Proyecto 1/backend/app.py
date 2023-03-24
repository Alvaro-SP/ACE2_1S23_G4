import mysql.connector
import traceback
from flask import Flask, jsonify
from flask import  make_response
from flask.globals import request
from flask_cors import CORS
from src.Dashboard import dashboard
from src.GetSessions import getSessions
#Flask config
app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})

work = 25
rest = 5
change = True   # Es verdader si se desea actualizar el tiempo
penalties = [0,0,0,0,0,0,0,0]
reset=False
state=0
actual_username=""
# ------------------- CONNECT WITH DATABASE:-------------------
conecction  = mysql.connector.connect(
    user='root',
    password='rootroot',
    host='proyecto.cxrmksgpe29a.us-east-2.rds.amazonaws.com',
    database='arqui2', 
    port='3306'
) 

#Crea el cursor para ejecutar las consultas
mycursor = conecction.cursor()

# ---------------------- Endpoints ----------------------
@app.route("/")
def index():
    return "<h1>Hi from backend, we are working hard!!</h1>"


@app.route('/data',methods=['POST'])
def hello():
    global work
    global rest
    global change
    global penalties
    global state
    global actual_username
    print(request.json)

    if request.json["state"] == 0: # Modo setup
        #Verificamos que ahorita mismo hubo un cambio de estado(De Trabajo a setup)
        if state==1:
            #Ya que validamos que hubo un cambio, indicamos que la sesión acabó, y guardamos los datos en la db.
            sql = '''INSERT INTO sesion (ejecucion, descanso, pomodoro1,pomodoro2,pomodoro3,pomodoro4,descanso1,descanso2,descanso3,descanso4,usuario_idusuario) 
            VALUES (%s, %s, %s,%s,%s,%s,%s,%s,%s,%s,%s)'''
            values= [(int(work), int(rest), int(penalties[0]),int(penalties[1]),int(penalties[2]),int(penalties[3]),int(penalties[4]),int(penalties[5]),int(penalties[6]),int(penalties[7]),int(actual_username))]
            # Intentando realizar la consulta
            try:
                with conecction.cursor() as cursor:
                    cursor.executemany(sql, values)
                    conecction.commit()
                    response = {
                        "state": "Perfect",
                        "message": "Session saved Successfully!!"
                    }
                    # Resetear el contador de penalizaciones
                    penalties=[]
                    for i in range(8):
                        penalties.append(0)
                    # Cambiamos el estado a setup
                    state=0
                    # Recolocando los valores predeterminados
                    change=True
                    rest=5
                    work=25
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
    # Viene state "1"
    else:           
        #Verificamos que ahorita mismo hubo un cambio de estado(De setup a trabajo)
        if state==0:
            state=1
            # Resetear el contador de penalizaciones
            penalties=[]
            for i in range(8):
                penalties.append(0)
        # Modo trabajo
        # Verificamos en que fase del pomodoro vamos:
        phase = request.json['pomodoro']
        button=request.json['button']
        
        phase = int(phase)
        if phase % 2 == 0:
            penalties[phase - 1] += int(button)
        else:
            if int(button) == 0:
                penalties[phase - 1] += 1
        print(penalties)
        
        # # Fase 1 - Pomodoro 1
        # if int(phase)==1:
        #     # Debería estar sentado, de lo contrario la penalización suma
        #     if int(button)==0:
        #         penalties[0]+=1
        # # Fase 2 - Descanso 1
        # if int(phase)==2:
        #     # Debería estar parado, de lo contrario la penalización suma
        #     if int(button)==1:
        #         penalties[1]+=1
        # # Fase 3 - Pomodoro 2
        # if int(phase)==3:
        #     # Debería estar sentado, de lo contrario la penalización suma
        #     if int(button)==0:
        #         penalties[2]+=1
        # # Fase 4 - Descanso 2
        # if int(phase)==4:
        #     # Debería estar parado, de lo contrario la penalización suma
        #     if int(button)==1:
        #         penalties[3]+=1
        # # Fase 5 - Pomodoro 3
        # if int(phase)==5:
        #     # Debería estar sentado, de lo contrario la penalización suma
        #     if int(button)==0:
        #         penalties[4]+=1
        # # Fase 6 - Descanso 3
        # if int(phase)==6:
        #     # Debería estar parado, de lo contrario la penalización suma
        #     if int(button)==1:
        #         penalties[5]+=1
        # # Fase 7 - Pomodoro 4
        # if int(phase)==7:
        #     # Debería estar sentado, de lo contrario la penalización suma
        #     if int(button)==0:
        #         penalties[6]+=1
        # # Fase 8 - Descanso 4
        # if int(phase)==8:
        #     # Debería estar parado, de lo contrario la penalización suma
        #     if int(button)==1:
        #         penalties[7]+=1
        
        
        return jsonify({
            "type":"work"
        })


@app.route('/datauser',methods=['POST'])
def data_user():
    global work
    global rest
    global actual_username
    #Se actualizan los datos de configuracion
    work = request.json['ejecucion']
    rest = request.json['descanso']
    actual_username = request.json['username']
    response = {
        "Status": "Data updated Successfully!!"
    }
    response = jsonify(response)
    response.headers.add('Access-Control-Allow-Origin', '*')
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
    response = jsonify(response)
    response.headers.add('Access-Control-Allow-Origin', '*')
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
        response = jsonify(response)
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response
    else:
        response = {
            "id": user_id
        }
        response = jsonify(response)
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response
    
    
def get_user_id_by_username(name):
    with conecction.cursor() as cursor:
        cursor.execute("SELECT idusuario FROM usuario WHERE nombre = %s", (name,))
        myresult = cursor.fetchone()
        if myresult is not None:
            return myresult[0]
        else:
            return None


# ---------------------- Login ----------------------
@app.route('/login',methods=['POST'])
def login():
    global actual_username
    username = request.json['username']
    sql = "SELECT idusuario FROM usuario WHERE nombre = %s"
    print("Intenado inisiar sesion con usuario: " + username)
    try:
        mycursor.execute(sql, [username])
        actual_username = mycursor.fetchone()[0]
        reponse =  make_response({
            "mensaje": "Bienvenido!! %s" % username,
            "estado": "1",
            "id": actual_username
        })
        reponse.headers.add('Access-Control-Allow-Origin', '*')
        return reponse
    
    except Exception as error:
        print('Error sesion User:',error)
        reponse =  make_response( {
            "mensaje": "No se encontro el usuario: %s" % username,
            "estado": "0"
        })
        reponse.headers.add('Access-Control-Allow-Origin', '*')
        return reponse
    
# ---------------------- Registro ----------------------
@app.route('/register',methods=['POST'])
def register():
    username = request.json['username']
    sql = "INSERT INTO usuario (nombre) VALUES (%s)"
    print("Intenado registrar usuario: " + username)
    try:
        mycursor.execute(sql, [username])
        conecction.commit()
        reponse =  make_response({
            "mensaje": "Username registered successfully!!",
            "estado": "1"
        })
        reponse.headers.add('Access-Control-Allow-Origin', '*')
        return reponse
    except Exception as error:
        print('Error inserting new User',error)
        reponse =  make_response( {
            "mensaje": "Username already Exists!!, cannot register right now!!",
            "estado": "0"
        })
        reponse.headers.add('Access-Control-Allow-Origin', '*')
        return reponse  

# ----------- Dashboard -----------
@app.route('/dashboard',methods=['GET'])
def return_dashboard():
    response = make_response({
        "estado": True,
        "crr_time": 4,
        "crr_parte": 4,
        "conf_tiempo": 45,
        "conf_descanzo": 5,
        "penalizacionTotal": 30 
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

# ----------- Graficas por fechas -----------
@app.route('/charts',methods=['GET'])
def return_session():
    global actual_username
    sql = " SELECT * FROM sesion WHERE usuario_idusuario = %s;"
    try:
        mycursor.execute(sql, [actual_username])
        sesiones = mycursor.fetchall()
        data = []
        for sesion in sesiones:
            data.append({
                "idsesion": sesion[0],
                "ejecucion": sesion[1],
                "descanso": sesion[2],
                "pomodoro1": sesion[3],
                "pomodoro2": sesion[4],
                "pomodoro3": sesion[5],
                "pomodoro4": sesion[6],
                "descanso1": sesion[7],
                "descanso2": sesion[8],
                "descanso3": sesion[9],
                "descanso4": sesion[10],
                "fecha": str(sesion[11])
            })
        #print("====",data)
        reponse =  make_response({
            "datos": data,
            "estado": "1",
            "mensaje": "Sesiones optenidas con exito",
        })
        reponse.headers.add('Access-Control-Allow-Origin', '*')
        return reponse
    
    except Exception as error:
        print('Error sesion User:',error)
        reponse =  make_response( {
             "datos": [],
            "mensaje": "Sesiones optenidas sin exito",
            "estado": "0"
        })
        reponse.headers.add('Access-Control-Allow-Origin', '*')
        return reponse

if __name__ == '__main__':
    app.run(threaded=True, port=5000,debug=True, host='0.0.0.0')

    



