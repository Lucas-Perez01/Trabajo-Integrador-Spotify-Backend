-- Consulta para obtener la cantidad de canciones

SELECT
    p.id_playlist,
    p.titulo AS nombre_playlist,
    p.estado,
    p.fecha_creacion,
    COUNT(pc.id_cancion) AS cant_canciones
FROM 
    playlist p
LEFT JOIN 
    playlist_cancion pc 
    ON p.id_playlist = pc.id_playlist
GROUP BY 
    p.id_playlist, p.titulo, p.estado, p.fecha_creacion
ORDER BY 
    p.id_playlist;
    

-- Consulta para obtener la duración total    
    
SELECT
    a.id_album,
    a.titulo AS titulo_album,
    art.nombre AS nombre_artista,
    a.anio_publicacion,
    SUM(c.duracion_seg) AS duracion_total_seg
FROM 
    album a
JOIN 
    artista art ON a.id_artista = art.id_artista
LEFT JOIN 
    cancion c 
    ON a.id_album = c.id_album
GROUP BY 
    a.id_album, a.titulo, art.nombre, a.anio_publicacion
ORDER BY 
    a.id_album;