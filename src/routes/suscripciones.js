/**
 * Rutas para suscripciones
 * Los estudiantes deben implementar todas las rutas relacionadas con suscripciones
 */

import { Router } from "express";
import {
  createSuscripcion,
  getSuscripciones,
} from "../controllers/suscripcionesController.js";
import validate from "../middlewares/validate.js";
import { suscripcionSchema } from "../schemas/suscripcion.js";

const router = Router();

// Crear suscripción
router.post("/", validate(suscripcionSchema), createSuscripcion);

// Listar suscripciones
router.get("/", getSuscripciones);

export default router;
