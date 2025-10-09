/**
 * Controlador de Artistas
 * Los estudiantes deben implementar toda la lógica de negocio para artistas
 */

// src/controllers/artistaController.js
import Artista from "../models/Artista.js";

// Crear un nuevo artista
const createArtista = async (req, res) => {
  try {
    const { nombre, imagen_url } = req.validated.body;

    if (!nombre) {
      return res.status(400).json({
        error: { code: 400, message: "Falta el campo 'nombre'", details: null },
      });
    }

    // Intentar crear el artista
    const artista = await Artista.create({ nombre, imagen_url });
    res.status(201).json(artista);
  } catch (error) {
    console.error(error);

    // Detectar conflicto de unicidad
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({
        error: {
          code: 409,
          message: "El nombre del artista ya existe",
          details: error.errors,
        },
      });
    }

    res.status(500).json({
      error: {
        code: 500,
        message: "Error al crear el artista",
        details: error.message,
      },
    });
  }
};

// Listar todos los artistas
const getArtistas = async (req, res) => {
  try {
    const artistas = await Artista.findAll();
    res.json(artistas);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: {
        code: 500,
        message: "Error al obtener artistas",
        details: error.message,
      },
    });
  }
};

export { createArtista, getArtistas };
