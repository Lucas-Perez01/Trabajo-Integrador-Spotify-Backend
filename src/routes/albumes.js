/**
 * Rutas para álbumes
 * Los estudiantes deben implementar todas las rutas relacionadas con álbumes
 */

// src/routes/albumesRoutes.js
import { Router } from "express";
import {
  createAlbum,
  getAlbumes,
  getCancionesDeAlbum,
} from "../controllers/albumesController.js";
import validate from "../middlewares/validate.js";
import { albumSchema } from "../schemas/album.js";

const router = Router();

/**
 * @swagger
 * /albumes:
 *   get:
 *     summary: Listar álbumes
 *     description: Obtiene una lista de todos los álbumes registrados o filtra por artista si se pasa ?artistaId=
 *     tags: [Álbumes]
 *     parameters:
 *       - in: query
 *         name: artistaId
 *         schema:
 *           type: integer
 *         description: Filtrar álbumes por id de artista
 *     responses:
 *       200:
 *         description: Lista de álbumes obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/AlbumResponse'
 *       500:
 *         description: Error interno del servidor
 */
router.get("/", getAlbumes);

/**
 * @swagger
 * /albumes:
 *   post:
 *     summary: Crear un nuevo álbum
 *     description: Crea un álbum con los datos proporcionados. Valida que el artista exista y que el título sea único por artista.
 *     tags: [Álbumes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AlbumCreate'
 *     responses:
 *       201:
 *         description: Álbum creado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AlbumResponse'
 *       404:
 *         description: Artista no encontrado
 *       409:
 *         description: Ya existe un álbum con ese título para el artista
 *       500:
 *         description: Error interno del servidor
 */
router.post("/", validate(albumSchema), createAlbum);

/**
 * @swagger
 * /albumes/{id}/canciones:
 *   get:
 *     summary: Listar canciones de un álbum
 *     description: Obtiene todas las canciones de un álbum específico.
 *     tags: [Álbumes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del álbum
 *     responses:
 *       200:
 *         description: Lista de canciones obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CancionResponse'
 *       404:
 *         description: Álbum no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.get("/:id/canciones", getCancionesDeAlbum);

export default router;
