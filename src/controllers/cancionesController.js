/**
 * Controlador de Canciones
 * Los estudiantes deben implementar toda la lógica de negocio para canciones
 */

import Cancion from "../models/Cancion.js";
import Album from "../models/Album.js";

// Crear una nueva canción
const createCancion = async (req, res) => {
  try {
    const { titulo, duracion_seg, id_album } = req.validated.body;

    // Verificar que el álbum exista
    const album = await Album.findByPk(id_album);
    if (!album) {
      return res.status(404).json({
        error: { code: 404, message: "El álbum especificado no existe" },
      });
    }

    const cancion = await Cancion.create({ titulo, duracion_seg, id_album });
    res.status(201).json(cancion);
  } catch (error) {
    console.error(error);

    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({
        error: { code: 409, message: "Ya existe una canción con ese título" },
      });
    }

    res.status(500).json({
      error: {
        code: 500,
        message: "Error al crear la canción",
        details: error.message,
      },
    });
  }
};

// Listar canciones (filtros por género y álbum)
const getCanciones = async (req, res) => {
  try {
    const { genero, albumId } = req.query;
    const where = {};

    if (albumId) where.id_album = Number(albumId);
    // (Cuando implementemos géneros se agregará el filtro por género)

    const canciones = await Cancion.findAll({ where });
    res.json(canciones);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: {
        code: 500,
        message: "Error al obtener las canciones",
        details: error.message,
      },
    });
  }
};

export { createCancion, getCanciones };
