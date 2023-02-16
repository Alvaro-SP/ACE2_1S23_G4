
import serial
import time
import requests


ser = serial.Serial( "/dev/ttyACM0", 9600, timeout=0.05)

start = False

temperatura = 0
presion = 0
humedadA = 0
humedadR = 0
velocidad = 0
direccion = "N"

while 1 :
    # if 
    b = ser.readline()
    text = str(b)
    text = text.replace("b'", "")
    text = text.replace("'", "")
    text = text.replace("\\r\\n", "")
    
    if text.__contains__("end"):
        start = False
        print("\n")
        
        url = '127.0.0.1:3000'
        
        myobj = {'temperatura': temperatura, 
                 'presion': presion,
                 'humedadA': humedadA,
                 'humedadR':humedadR,
                 'velocidad':velocidad,
                 'direccion':direccion }
        
        print(myobj)
        print("\n")
        
        # x = requests.post(url, json = myobj)
    
    if start:
        print(text)
        
        if text.__contains__("T:"):
            text = text.replace("T:", "")
            temperatura = float(text)
            
        if text.__contains__("R:"):
            text = text.replace("R:", "")
            humedadR = float(text)
            
        if text.__contains__("A:"):
            text = text.replace("A:", "")
            humedadA = float(text)
        
        if text.__contains__("P:"):
            text = text.replace("P:", "")
            presion = float(text)
            
        if text.__contains__("V:"):
            text = text.replace("V:", "")
            velocidad = float(text)
        
        if text.__contains__("D:"):
            text = text.replace("D:", "")
            direccion = text
        
        
    if text.__contains__("start"):
        start = True
        
    
        

