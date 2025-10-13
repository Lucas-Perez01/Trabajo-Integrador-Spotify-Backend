/**
 * Rutas para playlists
 * Los estudiantes deben implementar todas las rutas relacionadas con playlists
 */

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

// Crear playlist
router.post("/", validate(playlistSchema), createPlaylist);

// Soft-delete playlist
router.put("/:id", validate(playlistSoftDeleteSchema), softDeletePlaylist);

// Agregar canción a playlist
router.post(
  "/:id/canciones",
  validate(playlistCancionSchema),
  addCancionToPlaylist
);

// Quitar canción de playlist
router.delete("/:id/canciones/:id_cancion", removeCancionFromPlaylist);

export default router;
