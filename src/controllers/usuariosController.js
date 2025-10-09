import Usuario from "../models/Usuario.js";
import bcrypt from "bcrypt";
import { Op } from "sequelize";

// Obtener todos los usuarios
const getUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.json(usuarios);
  } catch (error) {
    console.error("❌ Error al obtener usuarios:", error);
    res
      .status(500)
      .json({ error: "Error interno", message: "Error al obtener usuarios" });
  }
};

// Obtener un usuario por ID
const getUsuarioById = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    if (!usuario) {
      return res
        .status(404)
        .json({ error: "No encontrado", message: "Usuario no encontrado" });
    }
    res.json(usuario);
  } catch (error) {
    console.error("❌ Error al obtener usuario:", error);
    res
      .status(500)
      .json({ error: "Error interno", message: "Error al obtener usuario" });
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
    } = req.validated.body;

    if (!email || !password || !fecha_nac || !sexo || !cp || !id_pais) {
      return res.status(400).json({
        error: "Datos faltantes",
        message: "Todos los campos son obligatorios",
      });
    }

    const existe = await Usuario.findOne({ where: { email } });
    if (existe) {
      return res.status(409).json({
        error: "Conflicto",
        message: "El email ya está registrado",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const usuario = await Usuario.create({
      email,
      password: hashedPassword,
      fecha_nac,
      sexo,
      cp,
      id_pais,
      tipo_usuario_actual,
      fecha_ult_mod_password: new Date(),
    });

    return res.status(201).json(usuario);
  } catch (error) {
    console.error("❌ Error al crear usuario:", error);

    if (error.name === "SequelizeForeignKeyConstraintError") {
      return res.status(400).json({
        error: "Error de referencia",
        message: "El país o tipo de usuario no existe",
      });
    }

    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({
        error: "Duplicado",
        message: "Ya existe un registro con esos datos únicos",
      });
    }

    res
      .status(500)
      .json({ error: "Error interno", message: "Error al crear usuario" });
  }
};

// Actualizar un usuario
const updateUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = { ...req.body };

    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
      updates.fecha_ult_mod_password = new Date();
    }
    const [updated] = await Usuario.update(updates, {
      where: { id_usuario: id },
    });

    if (!updated) {
      return res
        .status(404)
        .json({ error: "No encontrado", message: "Usuario no encontrado" });
    }

    const usuarioActualizado = await Usuario.findByPk(id);
    res.json(usuarioActualizado);
  } catch (error) {
    console.error("❌ Error al actualizar usuario:", error);
    res
      .status(500)
      .json({ error: "Error interno", message: "Error al actualizar usuario" });
  }
};

// Eliminar un usuario
const deleteUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    if (!usuario) {
      return res
        .status(404)
        .json({ error: "No encontrado", message: "Usuario no encontrado" });
    }
    await usuario.destroy();
    res.json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    console.error("❌ Error al eliminar usuario:", error);
    res
      .status(500)
      .json({ error: "Error interno", message: "Error al eliminar usuario" });
  }
};

// Listar usuarios con password vencida (más de 90 días)
const listarUsuariosPasswordVencida = async (req, res) => {
  try {
    const noventaDias = new Date();
    noventaDias.setDate(noventaDias.getDate() - 90);

    const usuariosVencidos = await Usuario.findAll({
      where: {
        fecha_ult_mod_password: {
          [Op.lt]: noventaDias,
        },
      },
    });

    res.json(usuariosVencidos);
  } catch (error) {
    console.error("❌ Error al listar usuarios vencidos:", error);
    res.status(500).json({
      error: "Error interno",
      message: "Error al listar usuarios con password vencida",
    });
  }
};

export {
  getUsuarios,
  getUsuarioById,
  createUsuario,
  updateUsuario,
  deleteUsuario,
  listarUsuariosPasswordVencida,
};
