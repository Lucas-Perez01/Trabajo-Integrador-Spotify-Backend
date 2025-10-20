-- Crear base de datos
CREATE DATABASE IF NOT EXISTS spotify;
USE spotify;

-- Tabla pais
CREATE TABLE pais (
    id_pais INT NOT NULL UNIQUE AUTO_INCREMENT PRIMARY KEY,
    nombre_pais VARCHAR(100) UNIQUE NOT NULL
);

-- Tabla tipo_usuario
CREATE TABLE tipo_usuario (
    id_tipo_usuario INT NOT NULL UNIQUE AUTO_INCREMENT PRIMARY KEY,
    nombre_tipo ENUM('free','standard','premium') NOT NULL UNIQUE
);

-- Tabla usuario
CREATE TABLE usuario (
    id_usuario INT NOT NULL UNIQUE AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    fecha_nac DATE NOT NULL,
    sexo CHAR(1) NOT NULL,
    cp VARCHAR(20) NOT NULL,
    id_pais INT,
    tipo_usuario_actual INT,
    fecha_ult_mod_password DATETIME,
    FOREIGN KEY (id_pais) REFERENCES pais(id_pais),
    FOREIGN KEY (tipo_usuario_actual) REFERENCES tipo_usuario(id_tipo_usuario)
);

-- Tabla artista
CREATE TABLE artista (
    id_artista INT NOT NULL UNIQUE AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) UNIQUE NOT NULL,
    imagen_url BLOB
);

-- Tabla discografica
CREATE TABLE discografica (
    id_discografica INT NOT NULL UNIQUE AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    id_pais INT,
    UNIQUE(nombre,id_pais),
    FOREIGN KEY (id_pais) REFERENCES pais(id_pais)
);

-- Tabla album
CREATE TABLE album (
    id_album INT NOT NULL UNIQUE AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(100) NOT NULL UNIQUE,
    id_artista INT NOT NULL,
    id_discografica INT NOT NULL,
    imagen_portada BLOB,
    anio_publicacion INT,
    UNIQUE(id_artista,titulo),
    FOREIGN KEY (id_artista) REFERENCES artista(id_artista),
    FOREIGN KEY (id_discografica) REFERENCES discografica(id_discografica)
);

-- Tabla genero
CREATE TABLE genero (
    id_genero INT NOT NULL UNIQUE AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) UNIQUE NOT NULL
);

-- Tabla cancion
CREATE TABLE cancion (
    id_cancion INT NOT NULL UNIQUE AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(100) NOT NULL UNIQUE,
    duracion_seg INT NOT NULL CHECK (duracion_seg>0),
    id_album INT NOT NULL,
    reproducciones BIGINT DEFAULT 0,
    likes BIGINT DEFAULT 0,
    fecha_agregada DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    FOREIGN KEY (id_album) REFERENCES album(id_album)
);

-- Tabla cancion_genero (N:M)
CREATE TABLE cancion_genero (
    id_cancion INT NOT NULL,
    id_genero INT NOT NULL,
    PRIMARY KEY (id_cancion,id_genero),
    FOREIGN KEY (id_cancion) REFERENCES cancion(id_cancion),
    FOREIGN KEY (id_genero) REFERENCES genero(id_genero)
);

-- Tabla playlist
CREATE TABLE playlist (
    id_playlist INT NOT NULL UNIQUE AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(100) NOT NULL,
    id_usuario INT NOT NULL,
    estado ENUM('activa','eliminada') DEFAULT 'activa',
    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    fecha_eliminada DATETIME NULL,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario),
    CHECK ((estado='eliminada' AND fecha_eliminada IS NOT NULL) OR (estado='activa' AND fecha_eliminada IS NULL))
);

-- Tabla playlist_cancion (N:M)
CREATE TABLE playlist_cancion (
    id_playlist INT NOT NULL,
    id_cancion INT NOT NULL,
    orden INT NOT NULL,
    fecha_agregada DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(id_playlist,id_cancion),
    FOREIGN KEY (id_playlist) REFERENCES playlist(id_playlist),
    FOREIGN KEY (id_cancion) REFERENCES cancion(id_cancion)
);

-- Tabla suscripcion
CREATE TABLE suscripcion (
    id_suscripcion INT NOT NULL UNIQUE AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    tipo_usuario ENUM('free','standard','premium') NOT NULL,
    fecha_inicio DATE NOT NULL,
    fecha_renovacion DATE NOT NULL,
    UNIQUE(id_usuario,fecha_inicio),
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario),
    CHECK (fecha_renovacion > fecha_inicio)
);

-- Tabla metodo_pago
CREATE TABLE metodo_pago (
    id_metodo_pago INT NOT NULL UNIQUE AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    tipo_forma_pago VARCHAR(50) NOT NULL,
    cbu VARCHAR(50) NOT NULL,
    banco_codigo VARCHAR(10) NOT NULL,
    nro_tarjeta_masc CHAR(4) NOT NULL,
    mes_caduca TINYINT NOT NULL,
    anio_caduca SMALLINT,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
);

-- Tabla pago
CREATE TABLE pago (
    id_pago INT NOT NULL UNIQUE AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    id_suscripcion INT NOT NULL,
    id_metodo_pago INT NOT NULL,
    importe DECIMAL(10,2),
    fecha_pago DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario),
    FOREIGN KEY (id_suscripcion) REFERENCES suscripcion(id_suscripcion),
    FOREIGN KEY (id_metodo_pago) REFERENCES metodo_pago(id_metodo_pago)
);