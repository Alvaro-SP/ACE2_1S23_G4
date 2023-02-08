import mysql.connector #pip install mysql-connector-python
conecction  = mysql.connector.connect(
               user='root', #este dato esta en el mysqlWorkBrench
               password='SerchiBoi502@',#este dato es la contrasena se tu usario en mysqlWorkBrench
               host='localhost',
               database='practica1', #el nombre de la tabla
               port='3306' #el puerto de la base de datos
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
   return  getQuery(noType) if noType > 0 and noType < 6 else []

#Obtiene los datos de la tabla segun el noType
def getQuery(noType):
   mycursor.execute(f"SELECT * FROM datos WHERE tipo = {noType};")
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




#Pruebas de las funciones de la base de datos
if __name__ == '__main__':
   print('Hello, world!')
   print(conecction)

   print('----SELECT----')
   print('all data',getAllData())
   print('temperature',getData(1))
   print('Humedad',getData(2))
   print('Velcidad del viento',getData(3))
   print('Direccion del viento',getData(4))
   print('Presion barometriva',getData(5))

   print('----INSERT INTO----')
   print('temperature',insertData(1,7))
   print('Humedad',insertData(2,7))
   print('Velcidad del viento',insertData(3,7))
   print('Direccion del viento',insertData(4,7))
   print('Presion barometriva',insertData(5,7))
   print('all data',getAllData())
  

   

   
