/**
 * Rutas para pagos
 * Los estudiantes deben implementar todas las rutas relacionadas con pagos
 */

// src/routes/pagos.js
import { Router } from "express";
import { createPago, getPagos } from "../controllers/pagosController.js";
import validate from "../middlewares/validate.js";
import { pagoSchema } from "../schemas/pago.js";

const router = Router();

// Crear pago
router.post("/", validate(pagoSchema), createPago);

// Listar pagos por usuario y rango
router.get("/", getPagos);

export default router;
