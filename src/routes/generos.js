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

// Crear género
router.post("/", validate(generoSchema), createGenero);

// Listar géneros
router.get("/", getGeneros);

export default router;
