USE spotify;

-- Paises
INSERT INTO pais (nombre_pais) VALUES 
('Argentina'),
('Estados Unidos'),
('España');

-- Tipos de usuario
INSERT INTO tipo_usuario (nombre_tipo) VALUES 
('free'),
('standard'),
('premium');

-- Artistas
INSERT INTO artista (nombre, imagen_url) VALUES 
('Pink Floyd', 'Pink Floyd.jpg'),
('AC/DC', NULL),
('The Rolling Stones', 'The Rolling Stones.jpg');

-- Discográficas
INSERT INTO discografica (nombre, id_pais) VALUES
('Sony Music Entertainment', 2),
('Universal Music Group', 2),
('Warner Music Group', 2),
('EMI Records', 2);

-- Albumes
INSERT INTO album (titulo, id_artista, id_discografica, imagen_portada) VALUES
('Is There Anybody Out There', 1, 3, 'imagenalbum.jpg'),
('Radio Sampler ‎2xCD', 1, 3, NULL),
('Delicate Sound Of Thunder', 1, 3, 'imagenalbum.jpg'),
('Highway to Hell', 2, 3, 'acdc.jpg');

-- Generos
INSERT INTO genero (nombre) VALUES 
('Rock'),
('Soul'),
('Jazz');

-- Canciones
INSERT INTO cancion (titulo, duracion_seg, id_album, reproducciones, likes) VALUES
('In The Flesh', 205, 1, 1000050, 7500),
('The Thin Ice', 169, 1, 850050, 7600),
('Gone For Bad', 218, 2, 1200400, 6500);

-- Cancion_genero
INSERT INTO cancion_genero (id_cancion, id_genero) VALUES
(1, 1),
(2, 1),
(3, 1),
(3, 2);

-- Usuarios
INSERT INTO usuario (email, password_hash, fecha_nac, sexo, cp, id_pais, tipo_usuario_actual) VALUES
('MORTIZ@mail.com', '********', '1975-09-27', 'F', '1001', 1, 3),
('IBALLESTEROS@mail.com', '**************', '1987-10-17', 'F', '1001', 1, 3),
('CRAMIREZ@mail.com', '**********', '1994-08-26', 'F', '1001', 1, 3);

-- Playlists
INSERT INTO playlist (titulo, id_usuario, estado, fecha_creacion, fecha_eliminada) VALUES
('Para correr', 1, 'activa', '2020-02-27 00:00:00', NULL),
('Para Estudiar', 2, 'activa', '2019-05-07 00:00:00', NULL),
('Para Gym', 3, 'eliminada', '2020-03-07 00:00:00', '2020-04-10 00:00:00'),
('Mi Playlist Test', 1, 'activa', NOW());

-- Playlist_cancion
INSERT INTO playlist_cancion (id_playlist, id_cancion, orden) VALUES
(4, 1, 1),
(4, 2, 2),
(5, 1, 1),
(5, 3, 1),
(6, 1, 1),
(6, 3, 2),
(10, 1, 1), 
(10, 2, 2);

-- Métodos de pago
INSERT INTO metodo_pago (id_usuario, tipo_forma_pago, cbu, banco_codigo, nro_tarjeta_masc, mes_caduca, anio_caduca) VALUES
(1, 'Efectivo', 0070002120000000000001, 0, 1234, 12, 27),
(2, 'Tarjeta de credito', 0170012540000000000002, 2, '8181', 10, 30),
(3, 'Tarjeta de credito', 0200033610000000000003, 17, '0087', 10, 28);

-- Suscripciones
INSERT INTO suscripcion (id_usuario, tipo_usuario, fecha_inicio, fecha_renovacion) VALUES
(1, 3, '2020-01-01 00:00:00', '2020-02-01 00:00:00'),
(2, 3, '2020-02-01 00:00:00', '2020-03-01 00:00:00'),
(3, 3, '2020-03-01 00:00:00', '2020-04-01 00:00:00');

-- Pagos
INSERT INTO pago (id_usuario, id_metodo_pago, id_suscripcion, importe, fecha_pago) VALUES
(1, 1, 1, 0, '2020-01-01 00:00:00'),
(1, 1, 1, 0, '2020-02-01 00:00:00'),
(2, 2, 2, 100, '2020-02-01 00:00:00'),
(1, 2, 1, 9.99, '2025-09-01'),
(2, 1, 2, 14.99, '2025-09-05');
