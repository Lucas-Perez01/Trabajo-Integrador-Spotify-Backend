/**
 * Rutas para canciones
 * Los estudiantes deben implementar todas las rutas relacionadas con canciones
 */

import { Router } from "express";
import {
  createCancion,
  getCanciones,
} from "../controllers/cancionesController.js";
import validate from "../middlewares/validate.js";
import { cancionSchema } from "../schemas/cancion.js";

const router = Router();

// Crear canción
router.post("/", validate(cancionSchema), createCancion);

// Listar canciones (con filtros)
router.get("/", getCanciones);

export default router;
