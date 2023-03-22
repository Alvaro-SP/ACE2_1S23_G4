
from flask import jsonify
import json
def dashboard(conecction, request):
    resdash = {}
    data = request.get_json()
    Nameuser = data['username']
    try:
        with conecction.cursor() as cursor:
            # obtener el id de usuario
            sql1 = "SELECT idusuario FROM usuario WHERE idusuario = %s;"
            values1 = (Nameuser,)
            cursor.execute(sql1, values1)
            idUser = cursor.fetchone()[0]

            # obtener la suma de los pomodoros
            sql2 = "SELECT SUM(pomodoro1 + pomodoro2 + pomodoro3 + pomodoro4) AS total_pomodoros FROM sesion WHERE usuario_idusuario = %s;"
            values2 = (idUser,)
            cursor.execute(sql2, values2)
            sumpomodoros = cursor.fetchone()[0]

            sql2 = '''
                SELECT SUM(pomodoro1 + pomodoro2 + pomodoro3 + pomodoro4) AS total_pomodoros WHERE FROM sesion;
            '''
            
            resdash = {
                "estado": True,
                "crr_time": 0,
                "conf_tiempo": 0,
                "cof_descanzo": 0,
                "penalizacionTotal": sumpomodoros
            }
            # Siempre cerrar la conexión a la base de datos
            cursor.close()
            conecction.close()
            return jsonify({ resdash})

    except Exception as ex:
            # Siempre cerrar la conexión a la base de datos
        print(ex)
        if conecction:
            conecction.close()
        return jsonify({'res': False})