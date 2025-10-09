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

// Crear un artista
router.post("/", validate(artistaSchema), createArtista);

// Listar artistas
router.get("/", getArtistas);

export default router;
