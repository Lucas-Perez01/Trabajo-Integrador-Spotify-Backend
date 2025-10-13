/**
 * Controlador de Pagos
 * Los estudiantes deben implementar toda la lógica de negocio para pagos
 */

// src/controllers/pagosController.js
import { Op } from "sequelize";
import Pago from "../models/Pago.js";
import Usuario from "../models/Usuario.js";
import Suscripcion from "../models/Suscripcion.js";
import MetodoPago from "../models/MetodoPago.js";

// Crear pago
const createPago = async (req, res) => {
  try {
    const { id_usuario, id_suscripcion, id_metodo_pago, importe, fecha_pago } =
      req.validated.body;

    // Validar que el usuario exista
    const usuario = await Usuario.findByPk(id_usuario);
    if (!usuario)
      return res.status(404).json({ error: "Usuario no encontrado" });

    // Validar suscripción
    const suscripcion = await Suscripcion.findByPk(id_suscripcion);
    if (!suscripcion)
      return res.status(404).json({ error: "Suscripción no encontrada" });

    // Validar método de pago
    const metodo = await MetodoPago.findByPk(id_metodo_pago);
    if (!metodo)
      return res.status(404).json({ error: "Método de pago no encontrado" });

    // Crear el pago
    const pago = await Pago.create({
      id_usuario,
      id_suscripcion,
      id_metodo_pago,
      importe,
      fecha_pago,
    });

    res.status(201).json(pago);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Listar pagos por usuario y rango de fechas
const getPagos = async (req, res) => {
  try {
    const { usuarioId, desde, hasta } = req.query;

    const where = {};

    if (usuarioId) where.id_usuario = usuarioId;

    if (desde && hasta) {
      where.fecha_pago = {
        [Op.between]: [new Date(desde), new Date(hasta)],
      };
    }

    const pagos = await Pago.findAll({ where });
    res.json(pagos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener pagos" });
  }
};

export { createPago, getPagos };
