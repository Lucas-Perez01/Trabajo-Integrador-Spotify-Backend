/**
 * Rutas para artistas
 * Los estudiantes deben implementar todas las rutas relacionadas con artistas
 */

// src/routes/artistaRoutes.js
import { Router } from "express";
import {
  createArtista,
  getArtistas,
} from "../controllers/artistasController.js";
import validate from "../middlewares/validate.js";
import { artistaSchema } from "../schemas/artista.js";

const router = Router();

/**
 * @swagger
 * /artistas:
 *   get:
 *     summary: Listar artistas
 *     description: Obtiene una lista de todos los artistas registrados.
 *     tags: [Artistas]
 *     responses:
 *       200:
 *         description: Lista de artistas obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ArtistaResponse'
 *       500:
 *         description: Error interno del servidor
 */
router.get("/", getArtistas);

/**
 * @swagger
 * /artistas:
 *   post:
 *     summary: Crear un nuevo artista
 *     description: Crea un artista con los datos proporcionados. Valida que el nombre sea único.
 *     tags: [Artistas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ArtistaCreate'
 *     responses:
 *       201:
 *         description: Artista creado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ArtistaResponse'
 *       400:
 *         description: Falta el campo obligatorio 'nombre'
 *       409:
 *         description: El nombre del artista ya existe
 *       500:
 *         description: Error interno del servidor
 */
router.post("/", validate(artistaSchema), createArtista);

export default router;
