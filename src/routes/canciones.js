/**
 * Rutas para canciones
 * Los estudiantes deben implementar todas las rutas relacionadas con canciones
 */

// src/routes/cancionesRoutes.js
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

/**
 * @swagger
 * /canciones:
 *   get:
 *     summary: Listar canciones
 *     description: Obtiene una lista de canciones, se pueden filtrar por género o álbum.
 *     tags: [Canciones]
 *     parameters:
 *       - in: query
 *         name: genero
 *         schema:
 *           type: integer
 *         description: Filtrar canciones por ID de género
 *       - in: query
 *         name: albumId
 *         schema:
 *           type: integer
 *         description: Filtrar canciones por ID de álbum
 *     responses:
 *       200:
 *         description: Lista de canciones obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CancionResponse'
 *       500:
 *         description: Error interno del servidor
 */
router.get("/", getCanciones);

/**
 * @swagger
 * /canciones:
 *   post:
 *     summary: Crear una nueva canción
 *     description: Crea una canción asociada a un álbum existente.
 *     tags: [Canciones]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CancionCreate'
 *     responses:
 *       201:
 *         description: Canción creada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CancionResponse'
 *       404:
 *         description: Álbum no encontrado
 *       409:
 *         description: Ya existe una canción con ese título
 *       500:
 *         description: Error interno del servidor
 */
router.post("/", validate(cancionSchema), createCancion);

/**
 * @swagger
 * /canciones/{id}/generos:
 *   post:
 *     summary: Asociar un género a una canción
 *     description: Añade un género a una canción específica.
 *     tags: [Canciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la canción
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_genero
 *             properties:
 *               id_genero:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Género asociado correctamente
 *       404:
 *         description: Canción o género no encontrado
 *       409:
 *         description: La canción ya tiene este género asociado
 *       500:
 *         description: Error interno del servidor
 */
router.post("/:id/generos", addGeneroToCancion);

/**
 * @swagger
 * /canciones/{id}/generos/{idGenero}:
 *   delete:
 *     summary: Quitar un género de una canción
 *     description: Elimina la asociación de un género de una canción específica.
 *     tags: [Canciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la canción
 *       - in: path
 *         name: idGenero
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del género a eliminar
 *     responses:
 *       200:
 *         description: Género eliminado correctamente
 *       404:
 *         description: La relación canción-género no existe
 *       500:
 *         description: Error interno del servidor
 */
router.delete("/:id/generos/:idGenero", removeGeneroFromCancion);

export default router;
