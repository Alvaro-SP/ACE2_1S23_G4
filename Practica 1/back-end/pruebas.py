
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

@socketio.on("otro")
def otrafuncion():
    print("Llamando a socketio.emit")
    socketio.emit("otro", "OTRA ONDA")


@socketio.on("disconnect")
def on_disconnect():
    print("Client disconnected")

# @socketio.on('data')
# def get_data():
    
#     socketio.emit("data", "opasidhfoisdanfjosijadofmjoidwsafsadmkjfopds")

#Pruebas de las funciones de la base de datos
if __name__ == '__main__':
    socketio.run(app)