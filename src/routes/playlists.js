/**
 * Rutas para playlists
 * Los estudiantes deben implementar todas las rutas relacionadas con playlists
 */

// src/routes/playlists.js

import { Router } from "express";
import {
  createPlaylist,
  softDeletePlaylist,
  addCancionToPlaylist,
  removeCancionFromPlaylist,
} from "../controllers/playlistsController.js";
import validate from "../middlewares/validate.js";
import {
  playlistSchema,
  playlistSoftDeleteSchema,
  playlistCancionSchema,
} from "../schemas/playlist.js";

const router = Router();

/**
 * @swagger
 * /playlists:
 *   post:
 *     summary: Crear una nueva playlist
 *     description: Crea una nueva playlist asociada a un usuario existente.
 *     tags: [Playlists]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PlaylistCreate'
 *     responses:
 *       201:
 *         description: Playlist creada correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PlaylistResponse'
 *       404:
 *         description: Usuario no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */
router.post("/", validate(playlistSchema), createPlaylist);

/**
 * @swagger
 * /playlists/{id}:
 *   put:
 *     summary: Eliminar (soft-delete) una playlist
 *     description: Marca una playlist como eliminada (no se borra físicamente).
 *     tags: [Playlists]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *           example: 5
 *         description: ID de la playlist a eliminar.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PlaylistSoftDelete'
 *     responses:
 *       200:
 *         description: Playlist eliminada correctamente.
 *       404:
 *         description: Playlist no encontrada.
 *       500:
 *         description: Error interno del servidor.
 */
router.put("/:id", validate(playlistSoftDeleteSchema), softDeletePlaylist);

/**
 * @swagger
 * /playlists/{id}/canciones:
 *   post:
 *     summary: Agregar una canción a una playlist
 *     description: Asocia una canción existente a una playlist en un orden específico.
 *     tags: [Playlists]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *           example: 3
 *         description: ID de la playlist.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PlaylistCancionAdd'
 *     responses:
 *       201:
 *         description: Canción agregada correctamente a la playlist.
 *       404:
 *         description: Playlist o canción no encontrada.
 *       500:
 *         description: Error interno del servidor.
 */
router.post(
  "/:id/canciones",
  validate(playlistCancionSchema),
  addCancionToPlaylist
);

/**
 * @swagger
 * /playlists/{id}/canciones/{id_cancion}:
 *   delete:
 *     summary: Quitar una canción de una playlist
 *     description: Elimina la relación entre una canción y una playlist.
 *     tags: [Playlists]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *           example: 3
 *         description: ID de la playlist.
 *       - name: id_cancion
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *           example: 10
 *         description: ID de la canción a quitar.
 *     responses:
 *       200:
 *         description: Canción eliminada de la playlist correctamente.
 *       404:
 *         description: Canción o playlist no encontrada.
 *       500:
 *         description: Error interno del servidor.
 */
router.delete("/:id/canciones/:id_cancion", removeCancionFromPlaylist);

export default router;
