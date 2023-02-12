from flask import Flask
from flask_cors import CORS

from flask_socketio import SocketIO, emit
import random
import time

app = Flask(__name__)
# CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})
socketio = SocketIO(app, cors_allowed_origins="*")

@socketio.on("connect")
def on_connect():
    print("Client connected")
    socketio.emit("data", "SI FUNCIONA")
    socketio.emit("otro", "OTRA ONDA")
    socketio.emit("otro1", "OTRA ONDA1")
    socketio.emit("otro2", "OTRA ONDA2")

@socketio.on('my event')
def another():
    emit('my response', 'another response')

 
@socketio.on("disconnect")
def on_disconnect():
    print("Client disconnected")

# @socketio.on('data')
# def get_data():
    
#     socketio.emit("data", "opasidhfoisdanfjosijadofmjoidwsafsadmkjfopds")

#Pruebas de las funciones de la base de datos
if __name__ == '__main__':
    socketio.run(app)