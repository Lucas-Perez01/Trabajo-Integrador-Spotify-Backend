/**
 * Controlador de Métodos de Pago
 * Los estudiantes deben implementar toda la lógica de negocio para métodos de pago
 */

import MetodoPago from "../models/MetodoPago.js";
import Usuario from "../models/Usuario.js";

// Crear método de pago
const createMetodoPago = async (req, res) => {
  try {
    const {
      id_usuario,
      tipo_forma_pago,
      nro_tarjeta,
      mes_caduca,
      anio_caduca,
      banco_codigo,
    } = req.validated.body;

    // Verificar que el usuario exista
    const usuario = await Usuario.findByPk(id_usuario);
    if (!usuario)
      return res.status(404).json({ error: "Usuario no encontrado" });

    // Generar nro_tarjeta_masc (últimos 4 dígitos)
    const nro_tarjeta_masc = nro_tarjeta.slice(-4);

    // Generar CBU
    const cbu =
      "00" +
      Math.floor(Math.random() * 1e20) // Aca generamos un número aleatorio de hasta 20 dígitos
        .toString() // Lo convertimos a string
        .padStart(20, "0");

    const metodoPago = await MetodoPago.create({
      id_usuario,
      tipo_forma_pago,
      nro_tarjeta_masc,
      mes_caduca,
      anio_caduca,
      banco_codigo,
      cbu,
    });

    res.status(201).json(metodoPago);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Listar métodos de pago por usuario
const getMetodosPago = async (req, res) => {
  try {
    const { usuarioId } = req.query;

    if (!usuarioId)
      return res.status(400).json({ error: "Se requiere usuarioId" });

    const metodos = await MetodoPago.findAll({
      where: { id_usuario: usuarioId },
    });
    res.json(metodos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export { createMetodoPago, getMetodosPago };
