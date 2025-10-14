/**
 * Rutas para suscripciones
 * Los estudiantes deben implementar todas las rutas relacionadas con suscripciones
 */

// src/routes/suscripciones.js

import { Router } from "express";
import {
  createSuscripcion,
  getSuscripciones,
} from "../controllers/suscripcionesController.js";
import validate from "../middlewares/validate.js";
import { suscripcionSchema } from "../schemas/suscripcion.js";

const router = Router();

/**
 * @swagger
 * /suscripciones:
 *   post:
 *     summary: Crear una nueva suscripción
 *     description: Crea una nueva suscripción asociada a un usuario y tipo de usuario.
 *     tags: [Suscripciones]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SuscripcionCreate'
 *     responses:
 *       201:
 *         description: Suscripción creada correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuscripcionResponse'
 *       404:
 *         description: Usuario o tipo de usuario no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */
router.post("/", validate(suscripcionSchema), createSuscripcion);

/**
 * @swagger
 * /suscripciones:
 *   get:
 *     summary: Obtener todas las suscripciones
 *     description: Retorna una lista con todas las suscripciones registradas.
 *     tags: [Suscripciones]
 *     responses:
 *       200:
 *         description: Lista de suscripciones obtenida correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/SuscripcionResponse'
 *       500:
 *         description: Error interno del servidor.
 */
router.get("/", getSuscripciones);

export default router;
