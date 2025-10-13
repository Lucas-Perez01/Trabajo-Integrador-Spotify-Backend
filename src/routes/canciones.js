/**
 * Rutas para canciones
 * Los estudiantes deben implementar todas las rutas relacionadas con canciones
 */

import { Router } from "express";
import {
  createCancion,
  getCanciones,
  addGeneroToCancion,
  removeGeneroFromCancion,
} from "../controllers/cancionesController.js";
import validate from "../middlewares/validate.js";
import { cancionSchema } from "../schemas/cancion.js";

const router = Router();

// Crear canción
router.post("/", validate(cancionSchema), createCancion);

// Listar canciones (con filtros)
router.get("/", getCanciones);

// Agregar y quitar géneros a una canción
router.post("/:id/generos", addGeneroToCancion);

// Quitar género de una canción
router.delete("/:id/generos/:idGenero", removeGeneroFromCancion);

export default router;
