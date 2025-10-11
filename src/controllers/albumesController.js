/**
 * Controlador de Álbumes
 * Los estudiantes deben implementar toda la lógica de negocio para álbumes
 */

// src/controllers/albumController.js
import Album from "../models/Album.js";
import Artista from "../models/Artista.js";

const createAlbum = async (req, res) => {
  try {
    const {
      titulo,
      id_artista,
      id_discografica,
      imagen_portada,
      anio_publicacion,
    } = req.validated.body;

    // Verificar que el artista exista
    const artista = await Artista.findByPk(id_artista);
    if (!artista) {
      return res.status(404).json({
        error: {
          code: 404,
          message: "El artista no existe",
        },
      });
    }

    // Crear el álbum
    const album = await Album.create({
      titulo,
      id_artista,
      id_discografica,
      imagen_portada,
      anio_publicacion,
    });

    res.status(201).json(album);
  } catch (error) {
    console.error(error);

    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({
        error: {
          code: 409,
          message: "Ya existe un álbum con ese título para el artista",
          details: error.errors,
        },
      });
    }

    res.status(500).json({
      error: {
        code: 500,
        message: "Error al crear el álbum",
        details: error.message,
      },
    });
  }
};

const getAlbumes = async (req, res) => {
  try {
    const { artistaId } = req.query;

    const where = artistaId ? { id_artista: Number(artistaId) } : {};

    const albumes = await Album.findAll({ where });
    res.json(albumes);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: {
        code: 500,
        message: "Error al obtener álbumes",
        details: error.message,
      },
    });
  }
};

const getCancionesDeAlbum = async (req, res) => {
  try {
    const { id } = req.params;

    // Verificar que el álbum exista
    const album = await Album.findByPk(id);
    if (!album) {
      return res.status(404).json({
        error: {
          code: 404,
          message: "El álbum no existe",
        },
      });
    }

    // Buscar canciones que pertenezcan a ese álbum
    const canciones = await Cancion.findAll({
      where: { id_album: id },
    });

    // Si no hay canciones, igual devolvemos lista vacía
    res.status(200).json(canciones);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: {
        code: 500,
        message: "Error al obtener canciones del álbum",
        details: error.message,
      },
    });
  }
};

export { createAlbum, getAlbumes, getCancionesDeAlbum };
