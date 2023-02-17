
--Este script crea la base de datos y la tabla de datos

CREATE DATABASE Practica1;



CREATE TABLE Datos2 (
	ID int NOT NULL AUTO_INCREMENT,
    temperatura int NOT NULL,
    presion int NOT NULL,
    relativa int NOT NULL,
    absoluta int NOT NULL,
    velocidad int NOT NULL,
    direccion int NOT NULL,
    PRIMARY KEY(ID)
);


-- Querys utiles para probar la base de datos:

--SELECT * FROM Practica1.datos;
--SELECT * FROM Practica1.datos WHERE Tipo = 1;
--INSERT INTO Practica1.datos (Tipo,Valor) VALUES (1,2);
--DELETE FROM practica1.datos WHERE Valor = 7;