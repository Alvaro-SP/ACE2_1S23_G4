CREATE DATABASE p2;
USE p2;

CREATE TABLE IF NOT EXISTS datos (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `fecha` DATETIME NULL,
  `state_bomba` INT NULL,
  `time_irrigation` INT NULL,
  `temp_externa` INT NULL,
  `temp_interna` INT NULL,
  `water_percent` INT NULL,
  `humidity` INT NULL
  )
  
  SELECT * FROM datos;