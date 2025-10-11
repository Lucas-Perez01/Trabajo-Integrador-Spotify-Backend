/**
 * Rutas para álbumes
 * Los estudiantes deben implementar todas las rutas relacionadas con álbumes
 */

// src/routes/albumRoutes.js
import { Router } from "express";
import {
  createAlbum,
  getAlbumes,
  getCancionesDeAlbum,
} from "../controllers/albumesController.js";
import validate from "../middlewares/validate.js";
import { albumSchema } from "../schemas/album.js";

const router = Router();

router.post("/", validate(albumSchema), createAlbum);
router.get("/", getAlbumes);
router.get("/:id/canciones", getCancionesDeAlbum);

export default router;
