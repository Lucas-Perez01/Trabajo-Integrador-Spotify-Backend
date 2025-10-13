/**
 * Rutas para métodos de pago
 * Los estudiantes deben implementar todas las rutas relacionadas con métodos de pago
 */

import { Router } from "express";
import {
  createMetodoPago,
  getMetodosPago,
} from "../controllers/metodosPagoController.js";
import validate from "../middlewares/validate.js";
import { metodoPagoSchema } from "../schemas/metodoPago.js";

const router = Router();

// Crear método de pago
router.post("/", validate(metodoPagoSchema), createMetodoPago);

// Listar métodos de pago por usuario
router.get("/", getMetodosPago);

export default router;
