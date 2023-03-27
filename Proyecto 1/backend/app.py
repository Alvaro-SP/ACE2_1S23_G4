import mysql.connector
import traceback
from flask import Flask, jsonify
from flask import  make_response
from flask.globals import request
from flask_cors import CORS
from src.Dashboard import dashboard
from src.GetSessions import getSessions
import datetime
import pytz
import ssl
context = ssl.SSLContext(ssl.PROTOCOL_SSLv23)
context.load_cert_chain('/etc/ssl/certs/ssl-cert-snakeoil.pem', '/etc/ssl/private/ssl-cert-snakeoil.key')

#Flask config
app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})

work = 25
rest = 5
change = True   # Es verdader si se desea actualizar el tiempo
penalties = [0,0,0,0,0,0,0,0]
times=[0,0,0,0,0,0,0,0]
reset=False
state=0
actual_username=0
phase=0
tz = pytz.timezone('America/Guatemala')
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
    global phase
    global times
    print("=====Levantando el servidor=====")
    print(request.json)

    if request.json["state"] == 0: # Modo setup
        #Verificamos que ahorita mismo hubo un cambio de estado(De Trabajo a setup)
        if state==1:

            now = datetime.datetime.now(tz =tz )
            resta = datetime.timedelta(minutes=(rest+work)*4)
            fecha_resultado = now - resta
            fecha_mysql = fecha_resultado.strftime("%Y-%m-%d %H:%M:%S")

            #Ya que validamos que hubo un cambio, indicamos que la sesión acabó, y guardamos los datos en la db.
            sql = '''INSERT INTO sesion (ejecucion, descanso, pomodoro1,pomodoro2,pomodoro3,pomodoro4,descanso1,descanso2,descanso3,descanso4,usuario_idusuario,fecha) 
            VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)'''
            values= [(int(work), int(rest), int(penalties[0]),int(penalties[1]),int(penalties[2]),int(penalties[3]),int(penalties[4]),int(penalties[5]),int(penalties[6]),int(penalties[7]),(actual_username),(fecha_mysql))]
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
                    # rest=5
                    # work=25
                    return response
            except:
                traceback.print_exc()
                print('=====Error inserting data====')
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
            times=[]
            for i in range(8):
                times.append(0)
        # Modo trabajo
        # Verificamos en que fase del pomodoro vamos:
        phase = request.json['pomodoro']
        button=request.json['button']
        
        phase = int(phase)
        if phase % 2 == 0:
            penalties[phase - 1] += int(button)
            times[phase - 1] += 1
        else:
            if int(button) == 0:
                penalties[phase - 1] += 1
                times[phase - 1] += 1
        print(penalties)
  
        return jsonify({
            "type":"work"
        })

# ---------------------- cambiar horas front ----------------------
@app.route('/datauser',methods=['POST'])
def data_user():
    global work
    global rest
    global change
    change = True
    #Se actualizan los datos de configuracion
    work = request.json['ejecucion']
    rest = request.json['descanso']
    print("Actualizando datos: ",work,rest)
    response =  make_response({
        "Status": "Data updated Successfully!!"
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

# ---------------------- Login ----------------------
@app.route('/login',methods=['POST'])
def login():
    global actual_username
    username = request.json['username']
    sql = "SELECT idusuario FROM usuario WHERE nombre = %s"
    print("Intenado inisiar sesion con usuario: " + username)
    try:
        mycursor.execute(sql, [username])
        val = mycursor.fetchone()[0]
        actual_username = int(val)
        reponse =  make_response({
            "mensaje": "Bienvenido!! %s" % username,
            "estado": "1",
            "id": actual_username
        })
        reponse.headers.add('Access-Control-Allow-Origin', '*')
        reponse.headers.add('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        reponse.headers.add('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
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
    global rest
    global penalties
    global work
    global phase
    global times
    response = make_response({
        "estado": True,
        "crr_time": times[phase-1]/60,
        "crr_parte": phase,
        "conf_tiempo": work,
        "conf_descanzo": rest,
        "penalizacionTotal": sum(penalties)/60
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

# ----------- Graficas por fechas -----------
@app.route('/charts',methods=['GET'])
def return_session():
    global actual_username
    sql = " SELECT * FROM sesion WHERE usuario_idusuario = %s;"
    try:
        val = actual_username
        mycursor.execute(sql, [str(val)])
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
    app.run(threaded=True, port=5000,debug=True, host='0.0.0.0',ssl_context=context)

    



# server {
#     listen 80;
#     listen [::]:80;

#     server_name pomodorog4arqui.duckdns.org;

#     return 301 https://$server_name$request_uri;
# }

# server {
#     listen 443 ssl;
#     listen [::]:443 ssl;

#     server_name pomodorog4arqui.duckdns.org;

#     ssl_certificate /etc/ssl/certs/ssl-cert-snakeoil.pem;
#     ssl_certificate_key /etc/ssl/private/ssl-cert-snakeoil.key;

#     location / {
#         proxy_pass http://localhost:5000;
#         proxy_set_header Host $host;
#         proxy_set_header X-Real-IP $remote_addr;
#     }
# }