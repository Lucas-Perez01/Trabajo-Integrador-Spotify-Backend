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

/**
 * @swagger
 * /pagos:
 *   get:
 *     summary: Listar pagos
 *     description: Obtiene una lista de pagos filtrados opcionalmente por usuario y rango de fechas.
 *     tags: [Pagos]
 *     parameters:
 *       - name: usuarioId
 *         in: query
 *         required: false
 *         schema:
 *           type: integer
 *           example: 1
 *         description: ID del usuario para filtrar los pagos.
 *       - name: desde
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *           format: date
 *           example: "2024-01-01"
 *         description: Fecha inicial del rango (incluida).
 *       - name: hasta
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *           format: date
 *           example: "2024-12-31"
 *         description: Fecha final del rango (incluida).
 *     responses:
 *       200:
 *         description: Lista de pagos obtenida correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PagoResponse'
 *       500:
 *         description: Error interno del servidor.
 */
router.get("/", getPagos);

/**
 * @swagger
 * /pagos:
 *   post:
 *     summary: Crear un nuevo pago
 *     description: Crea un pago asociado a un usuario, suscripción y método de pago existentes.
 *     tags: [Pagos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PagoCreate'
 *     responses:
 *       201:
 *         description: Pago creado correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PagoResponse'
 *       404:
 *         description: Usuario, suscripción o método de pago no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */
router.post("/", validate(pagoSchema), createPago);

export default router;
