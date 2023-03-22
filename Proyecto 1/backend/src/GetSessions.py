
from flask import jsonify
def getSessions(conecction, request):
    # * obtener el user de request
    data = request.get_json()
    Nameuser = data['username']
    try:
        with conecction.cursor() as cursor:
            #* obtener el id de usuario
            sql1 = "SELECT idusuario FROM usuario WHERE nombre = %s;"
            values1 = [(Nameuser)]
            cursor.execute(sql1, values1)
            idUser = cursor.fetchone()[0]

            #! obtener las sesiones del usuario
            sql2 = "SELECT * FROM sesion WHERE usuario_idusuario = %s;"
            values2 = [(idUser)]
            cursor.execute(sql2, values2)
            sesiones = cursor.fetchall()
            # * create an empty list to store the session objects
            session_list = []
            #* guardar las sesiones en un json
            for sesion in sesiones:
                #* create a dictionary for the session object
                session_dict = {
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
                    "fecha": str(sesion[11]),  # assuming fecha is a datetime object
                }
                #* append the session object to the list
                session_list.append(session_dict)


            # Siempre cerrar la conexión a la base de datos
            cursor.close()
            # conecction.close()
            return jsonify(session_list)

    except Exception as ex:
            # Siempre cerrar la conexión a la base de datos
        print(ex)
        if conecction:
            conecction.close()
        return jsonify({'res': False})