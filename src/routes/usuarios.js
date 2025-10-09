/**
 * Rutas para usuarios
 * Los estudiantes deben implementar todas las rutas relacionadas con usuarios
 */

// src/routes/usuarios.js

// Importamos las funciones de controllers
import { Router } from "express";
import {
  getUsuarios,
  getUsuarioById,
  createUsuario,
  updateUsuario,
  deleteUsuario,
  listarUsuariosPasswordVencida,
} from "../controllers/usuariosController.js";

// Importamos el middleware de validación y los esquemas
import validate from "../middlewares/validate.js";
import {
  createUsuarioSchema,
  updateUsuarioSchema,
  getUsuarioSchema,
} from "../schemas/usuario.js";

const router = Router();

// Obtener todos los usuarios
router.get("/", getUsuarios);

// Listar usuarios con password vencida
router.get("/password-vencidas", listarUsuariosPasswordVencida);

// Obtener usuario por ID con validación
router.get("/:id", validate(getUsuarioSchema), getUsuarioById);

// Crear nuevo usuario con validación
router.post("/", validate(createUsuarioSchema), createUsuario);

// Actualizar usuario por ID con validación
router.put("/:id", validate(updateUsuarioSchema), updateUsuario);

// Eliminar usuario por ID con validación
router.delete("/:id", validate(getUsuarioSchema), deleteUsuario);

export default router;
