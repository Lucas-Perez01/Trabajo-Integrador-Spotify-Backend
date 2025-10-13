/**
 * Configuración principal de la aplicación Express
 * Los estudiantes deben completar la configuración de middlewares y rutas
 */

// TODO: Importar las rutas

// TODO: Configurar CORS

// TODO: Configurar parseo de JSON
// Ejemplo: app.use(express.json());

// TODO: Configurar rutas
// Ejemplo: app.use('/api/v1/usuarios', usuariosRoutes);

// TODO: Configurar middleware de manejo de errores (debe ir al final)

// TODO: Configurar ruta 404

// src/app.js
import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

// Importamos rutas
import usuariosRoutes from "./routes/usuarios.js";
import artistaRoutes from "./routes/artistas.js";
import albumRoutes from "./routes/albumes.js";
import cancionRoutes from "./routes/canciones.js";
import generosRoutes from "./routes/generos.js";
import playlistRoutes from "./routes/playlists.js";
import suscripcionesRoutes from "./routes/suscripciones.js";
import metodosPagoRoutes from "./routes/metodos-pago.js";
import pagosRoutes from "./routes/pagos.js";

const app = express();

// Middlewares de seguridad y parseo
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // Son 15 minutos
    max: 100,
  })
);

// Ruta de prueba
app.get("/api/v1/test", async (req, res) => {
  try {
    //probar la conexión a la Base de Datos
    res.json({ message: "Prueba de conexión" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error conectando con la base de datos" });
  }
});

app.use("/api/v1/usuarios", usuariosRoutes);
app.use("/api/v1/artistas", artistaRoutes);
app.use("/api/v1/albumes", albumRoutes);
app.use("/api/v1/canciones", cancionRoutes);
app.use("/api/v1/generos", generosRoutes);
app.use("/api/v1/playlists", playlistRoutes);
app.use("/api/v1/suscripciones", suscripcionesRoutes);
app.use("/api/v1/metodos-pago", metodosPagoRoutes);
app.use("/api/v1/pagos", pagosRoutes);

// Middleware de manejo de errores
app.use((error, req, res, next) => {
  console.error(error.stack);
  res.status(500).json({ error: "Error interno del servidor" });
});

// Ruta 404
app.use((req, res) => {
  res.status(404).json({ error: "Endpoint no encontrado" });
});

export default app;
