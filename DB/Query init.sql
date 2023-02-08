
--Este script crea la base de datos y la tabla de datos
CREATE SCHEMA Practica1;
CREATE TABLE Practica1.Datos (
	ID int NOT NULL AUTO_INCREMENT,
    Tipo int NOT NULL,
    Valor double NOT NULL,
    PRIMARY KEY(ID)
);


-- Querys utiles para probar la base de datos:

--SELECT * FROM Practica1.datos;
--SELECT * FROM Practica1.datos WHERE Tipo = 1;
--INSERT INTO Practica1.datos (Tipo,Valor) VALUES (1,2);
--DELETE FROM practica1.datos WHERE Valor = 7;