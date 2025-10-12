/**
 * Controlador de Géneros
 * Los estudiantes deben implementar toda la lógica de negocio para géneros
 */

// src/controllers/generosController.js
import Genero from "../models/Genero.js";

const createGenero = async (req, res) => {
  try {
    const { nombre } = req.validated.body;

    const genero = await Genero.create({ nombre });
    res.status(201).json(genero);
  } catch (error) {
    console.error(error);

    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({
        error: {
          code: 409,
          message: "Ya existe un género con ese nombre",
        },
      });
    }

    res.status(500).json({
      error: {
        code: 500,
        message: "Error al crear el género",
        details: error.message,
      },
    });
  }
};

const getGeneros = async (req, res) => {
  try {
    const generos = await Genero.findAll();
    res.json(generos);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: {
        code: 500,
        message: "Error al obtener los géneros",
        details: error.message,
      },
    });
  }
};

export { createGenero, getGeneros };
