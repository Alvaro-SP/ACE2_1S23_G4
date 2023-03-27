use arqui2;
select * from usuario;


select * from sesion;

CREATE TABLE usuario (
    idusuario INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(45) NULL,
    PRIMARY KEY (idusuario),
    UNIQUE KEY nombre_UNIQUE (nombre)
);

CREATE TABLE IF NOT EXISTS sesion (
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
    fecha DATETIME ,
    usuario_idusuario INT NOT NULL,
    PRIMARY KEY (idsesion),
    CONSTRAINT fk_sesion_usuario
        FOREIGN KEY (usuario_idusuario)
        REFERENCES usuario(idusuario)
);
