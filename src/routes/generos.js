/**
 * Rutas para géneros
 * Los estudiantes deben implementar todas las rutas relacionadas con géneros
 */

// src/routes/generosRoutes.js
import { Router } from "express";
import { createGenero, getGeneros } from "../controllers/generosController.js";
import validate from "../middlewares/validate.js";
import { generoSchema } from "../schemas/genero.js";

const router = Router();

/**
 * @swagger
 * /generos:
 *   get:
 *     summary: Listar géneros
 *     description: Obtiene una lista de todos los géneros musicales.
 *     tags: [Géneros]
 *     responses:
 *       200:
 *         description: Lista de géneros obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/GeneroResponse'
 *       500:
 *         description: Error interno del servidor
 */
router.get("/", getGeneros);

/**
 * @swagger
 * /generos:
 *   post:
 *     summary: Crear un nuevo género
 *     description: Crea un género musical con un nombre único.
 *     tags: [Géneros]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GeneroCreate'
 *     responses:
 *       201:
 *         description: Género creado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GeneroResponse'
 *       409:
 *         description: Ya existe un género con ese nombre
 *       500:
 *         description: Error interno del servidor
 */
router.post("/", validate(generoSchema), createGenero);

export default router;
