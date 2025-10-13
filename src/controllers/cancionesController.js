/**
 * Controlador de Canciones
 * Los estudiantes deben implementar toda la lógica de negocio para canciones
 */

import Cancion from "../models/Cancion.js";
import Album from "../models/Album.js";
import Genero from "../models/Genero.js";
import CancionGenero from "../models/CancionGenero.js";

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

// Asociar un género a una canción
const addGeneroToCancion = async (req, res) => {
  try {
    const { id } = req.params;
    const { id_genero } = req.body;

    const cancion = await Cancion.findByPk(id);
    const genero = await Genero.findByPk(id_genero);

    if (!cancion || !genero) {
      return res.status(404).json({ error: "Canción o género no encontrado" });
    }

    // Verificar si ya está asociada
    const existe = await CancionGenero.findOne({
      where: { id_cancion: id, id_genero },
    });
    if (existe) {
      return res
        .status(409)
        .json({ error: "La canción ya tiene este género asociado" });
    }

    await CancionGenero.create({ id_cancion: id, id_genero });

    res.status(201).json({
      message: "Género asociado correctamente a la canción",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Error al asociar género a la canción",
      details: error.message,
    });
  }
};

// Quitar un género de una canción
const removeGeneroFromCancion = async (req, res) => {
  try {
    const { id, idGenero } = req.params;

    const deleted = await CancionGenero.destroy({
      where: { id_cancion: id, id_genero: idGenero },
    });

    if (!deleted) {
      return res
        .status(404)
        .json({ error: "La relación canción-género no existe" });
    }

    res.json({ message: "Género eliminado correctamente de la canción" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Error al quitar género de la canción",
      details: error.message,
    });
  }
};

export {
  createCancion,
  getCanciones,
  addGeneroToCancion,
  removeGeneroFromCancion,
};
