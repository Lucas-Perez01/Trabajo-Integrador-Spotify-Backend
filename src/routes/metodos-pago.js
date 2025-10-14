/**
 * Rutas para métodos de pago
 * Los estudiantes deben implementar todas las rutas relacionadas con métodos de pago
 */

//src/routes/metodos-pago.js

import { Router } from "express";
import {
  createMetodoPago,
  getMetodosPago,
} from "../controllers/metodosPagoController.js";
import validate from "../middlewares/validate.js";
import { metodoPagoSchema } from "../schemas/metodoPago.js";

const router = Router();

/**
 * @swagger
 * /metodos-pago:
 *   get:
 *     summary: Listar métodos de pago de un usuario
 *     description: Devuelve todos los métodos de pago asociados a un usuario.
 *     tags: [Métodos de Pago]
 *     parameters:
 *       - name: usuarioId
 *         in: query
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *         description: ID del usuario cuyos métodos de pago se desean listar.
 *     responses:
 *       200:
 *         description: Lista de métodos de pago obtenida correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/MetodoPagoResponse'
 *       400:
 *         description: Falta el parámetro usuarioId.
 *       500:
 *         description: Error interno del servidor.
 */
router.get("/", getMetodosPago);

/**
 * @swagger
 * /metodos-pago:
 *   post:
 *     summary: Crear un nuevo método de pago
 *     description: Crea un método de pago para un usuario existente.
 *     tags: [Métodos de Pago]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MetodoPagoCreate'
 *     responses:
 *       201:
 *         description: Método de pago creado correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MetodoPagoResponse'
 *       404:
 *         description: Usuario no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */
router.post("/", validate(metodoPagoSchema), createMetodoPago);

export default router;
