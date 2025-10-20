import { sequelize } from "../config/database.js";

// Vista 1: Canciones populares por país
const cancionesPopularesPorPais = async (req, res) => {
  try {
    const query = `
      SELECT 
        c.titulo AS nombre_cancion,
        a.titulo AS nombre_album,
        ar.nombre AS nombre_artista,
        p.nombre_pais,
        SUM(c.reproducciones) AS total_reproducciones,
        COUNT(DISTINCT pc.id_playlist) AS apariciones_en_playlists
      FROM cancion c
      INNER JOIN album a ON c.id_album = a.id_album
      INNER JOIN artista ar ON a.id_artista = ar.id_artista
      INNER JOIN playlist_cancion pc ON c.id_cancion = pc.id_cancion
      INNER JOIN playlist pl ON pc.id_playlist = pl.id_playlist
      INNER JOIN usuario u ON pl.id_usuario = u.id_usuario
      INNER JOIN pais p ON u.id_pais = p.id_pais
      WHERE LOWER(pl.estado) = 'activa'
      GROUP BY c.id_cancion, a.id_album, ar.id_artista, p.id_pais
      ORDER BY p.nombre_pais, total_reproducciones DESC;
    `;

    const [resultados] = await sequelize.query(query);

    if (!resultados.length) {
      return res.status(404).json({
        message: "No se encontraron canciones populares por país",
      });
    }

    res.status(200).json(resultados);
  } catch (error) {
    console.error("Error en cancionesPopularesPorPais:", error);
    res.status(500).json({
      error: "Error al obtener las canciones populares por país",
    });
  }
};

// Vista 2: Ingresos por artista y discográfica
const ingresosPorArtistaDiscografica = async (req, res) => {
  try {
    const query = `
      SELECT
          ar.nombre AS nombre_artista,
          d.nombre AS nombre_discografica,
          p.nombre_pais AS nombre_pais_discografica,
          COALESCE(SUM(pa.importe),0) AS total_ingresos,
          COUNT(DISTINCT s.id_suscripcion) AS cantidad_suscripciones_activas,
          COUNT(DISTINCT c.id_cancion) AS total_canciones,
          ROUND(AVG(c.reproducciones),2) AS promedio_reproducciones
      FROM artista ar
      LEFT JOIN album al ON ar.id_artista = al.id_artista
      LEFT JOIN discografica d ON al.id_discografica = d.id_discografica
      LEFT JOIN pais p ON d.id_pais = p.id_pais
      LEFT JOIN cancion c ON al.id_album = c.id_album
      LEFT JOIN playlist_cancion pc ON c.id_cancion = pc.id_cancion
      LEFT JOIN playlist pl ON pc.id_playlist = pl.id_playlist
      LEFT JOIN usuario u ON pl.id_usuario = u.id_usuario
      LEFT JOIN suscripcion s ON u.id_usuario = s.id_usuario AND s.fecha_renovacion > NOW()
      LEFT JOIN pago pa ON s.id_suscripcion = pa.id_suscripcion
      GROUP BY ar.id_artista, d.id_discografica, p.id_pais
      ORDER BY total_ingresos DESC;
    `;

    const [resultados] = await sequelize.query(query);

    if (!resultados.length) {
      return res.status(404).json({
        message: "No se encontraron ingresos por artista y discográfica",
      });
    }

    res.status(200).json(resultados);
  } catch (error) {
    console.error("Error en ingresosPorArtistaDiscografica:", error);
    res.status(500).json({
      error: "Error al obtener los ingresos por artista y discográfica",
    });
  }
};

export { cancionesPopularesPorPais, ingresosPorArtistaDiscografica };
