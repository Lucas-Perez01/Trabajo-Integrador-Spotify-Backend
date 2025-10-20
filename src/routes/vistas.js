import { Router } from "express";
import {
  cancionesPopularesPorPais,
  ingresosPorArtistaDiscografica,
} from "../controllers/vistasController.js";

const router = Router();

router.get("/canciones-populares-por-pais", cancionesPopularesPorPais);
router.get(
  "/ingresos-por-artista-discografica",
  ingresosPorArtistaDiscografica
);

export default router;
