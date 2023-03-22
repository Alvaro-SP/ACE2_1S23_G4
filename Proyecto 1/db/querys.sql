use arqui2;

CREATE TABLE usuario (
  idusuario INT NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(45) NULL,
  PRIMARY KEY (idusuario)
);

CREATE TABLE sesion (
  idsesion INT NOT NULL AUTO_INCREMENT,
  ejecucion INT NULL,
  descanso INT NULL,
  pomodoro1 INT NULL,
  pomodoro2 INT NULL,
  pomodoro3 INT NULL,
  pomodoro4 INT NULL,
  descanso1 INT NULL,
  descanso2 INT NULL,
  descanso3 INT NULL,
  descanso4 INT NULL,
  fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
  usuario_idusuario INT NOT NULL,
  PRIMARY KEY (idsesion),
  FOREIGN KEY (usuario_idusuario) REFERENCES usuario(idusuario)
);
