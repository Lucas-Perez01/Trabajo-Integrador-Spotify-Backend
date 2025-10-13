/**
 * Controlador de Suscripciones
 * Los estudiantes deben implementar toda la lógica de negocio para suscripciones
 */

import Suscripcion from "../models/Suscripcion.js";
import Usuario from "../models/Usuario.js";
import TipoUsuario from "../models/TipoUsuario.js";

// Crear suscripción
const createSuscripcion = async (req, res) => {
  try {
    const { id_usuario, id_tipo_usuario, fecha_inicio, fecha_renovacion } =
      req.validated.body;

    // Verificar que usuario exista
    const usuario = await Usuario.findByPk(id_usuario);
    if (!usuario)
      return res.status(404).json({ error: "Usuario no encontrado" });

    // Verificar que tipo de usuario exista
    const tipoUsuario = await TipoUsuario.findByPk(id_tipo_usuario);
    if (!tipoUsuario)
      return res.status(404).json({ error: "Tipo de usuario no encontrado" });

    // Crear suscripción
    const suscripcion = await Suscripcion.create({
      id_usuario,
      tipo_usuario: tipoUsuario.nombre_tipo,
      fecha_inicio,
      fecha_renovacion,
    });

    res.status(201).json(suscripcion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Listar suscripciones
const getSuscripciones = async (req, res) => {
  try {
    const suscripciones = await Suscripcion.findAll();
    res.json(suscripciones);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener suscripciones" });
  }
};

export { createSuscripcion, getSuscripciones };
