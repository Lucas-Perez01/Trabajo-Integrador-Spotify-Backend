/**
 * Controlador de Usuarios
 * Los estudiantes deben implementar toda la lógica de negocio para usuarios
 */

import Usuario from "../models/Usuario.js";
import bcrypt from "bcrypt";
import { Op } from "sequelize";

// Obtener todos los usuarios
const getUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.json(usuarios);
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
};

// Obtener un usuario por ID
const getUsuarioById = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.json(usuario);
  } catch (error) {
    console.error("Error al obtener usuario:", error);
    res.status(500).json({ error: "Error al obtener usuario" });
  }
};

// Crear un nuevo usuario
const createUsuario = async (req, res) => {
  try {
    const {
      email,
      password,
      fecha_nac,
      sexo,
      cp,
      id_pais,
      tipo_usuario_actual,
    } = req.body;

    // Hash del password
    const hashedPassword = await bcrypt.hash(password, 10);

    const usuario = await Usuario.create({
      email,
      password: hashedPassword,
      fecha_nacimiento: fecha_nac,
      sexo,
      codigo_postal: cp,
      pais: id_pais,
      fecha_modificacion_password: new Date(),
    });

    res.status(201).json(usuario);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear usuario" });
  }
};

// Actualizar un usuario
const updateUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = { ...req.body };

    // Si se actualiza password, hash y actualizar fecha_modificacion_password
    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
      updates.fecha_modificacion_password = new Date();
    }

    const [updated] = await Usuario.update(updates, {
      where: { id_usuario: id },
    });

    if (!updated)
      return res.status(404).json({ error: "Usuario no encontrado" });

    const usuarioActualizado = await Usuario.findByPk(id);
    res.json(usuarioActualizado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar usuario" });
  }
};

// Eliminar un usuario
const deleteUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    await usuario.destroy();
    res.json({ mensaje: "Usuario eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    res.status(500).json({ error: "Error al eliminar usuario" });
  }
};

// Listar usuarios con password vencida (más de 90 días)
const listarUsuariosPasswordVencida = async (req, res) => {
  try {
    const noventaDias = new Date();
    noventaDias.setDate(noventaDias.getDate() - 90);

    const usuariosVencidos = await Usuario.findAll({
      where: {
        fecha_modificacion_password: { [Op.lt]: noventaDias },
      },
    });

    res.json(usuariosVencidos);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Error al listar usuarios con password vencida" });
  }
};

// Exportamos las funciones del controlador

export {
  getUsuarios,
  getUsuarioById,
  createUsuario,
  updateUsuario,
  deleteUsuario,
  listarUsuariosPasswordVencida,
};
