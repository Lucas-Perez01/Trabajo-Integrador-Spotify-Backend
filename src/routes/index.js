// src/routes/index.js
import express from "express";

// Importamos todas las rutas
import usuariosRoutes from "./usuarios.js";
import artistasRoutes from "./artistas.js";
import albumesRoutes from "./albumes.js";
import cancionesRoutes from "./canciones.js";
import generosRoutes from "./generos.js";
import playlistsRoutes from "./playlists.js";
import suscripcionesRoutes from "./suscripciones.js";
import metodosPagoRoutes from "./metodos-pago.js";
import pagosRoutes from "./pagos.js";

const router = express.Router();

// Configurar las rutas con sus prefijos
router.use("/usuarios", usuariosRoutes);
router.use("/artistas", artistasRoutes);
router.use("/albumes", albumesRoutes);
router.use("/canciones", cancionesRoutes);
router.use("/generos", generosRoutes);
router.use("/playlists", playlistsRoutes);
router.use("/suscripciones", suscripcionesRoutes);
router.use("/metodos-pago", metodosPagoRoutes);
router.use("/pagos", pagosRoutes);

// Ruta de prueba
router.get("/", (req, res) => {
  res.json({
    message: "API Spotify - Backend funcionando correctamente",
    version: "1.0.0",
    endpoints: {
      usuarios: "/api/v1/usuarios",
      artistas: "/api/v1/artistas",
      albumes: "/api/v1/albumes",
      canciones: "/api/v1/canciones",
      generos: "/api/v1/generos",
      playlists: "/api/v1/playlists",
      suscripciones: "/api/v1/suscripciones",
      metodosPago: "/api/v1/metodos-pago",
      pagos: "/api/v1/pagos",
    },
  });
});

export default router;
