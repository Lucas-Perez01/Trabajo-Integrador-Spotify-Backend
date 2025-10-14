/**
 * Configuración principal de la aplicación Express
 * Los estudiantes deben completar la configuración de middlewares y rutas
 */

// src/app.js
import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import YAML from "yamljs";
import path from "path";
import { fileURLToPath } from "url";

// Importamos rutas
import routes from "./routes/index.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100, // Máximo de requests por IP
  })
);

// Ruta de prueba
app.get("/api/v1/test", async (req, res) => {
  res.json({ message: "Prueba de conexión" });
});

app.use("/api/v1", routes);

// Carga el YAML base
const swaggerBase = YAML.load(path.join(__dirname, "./docs/swagger.yaml"));

const swaggerOptions = {
  definition: swaggerBase,
  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Middleware global de errores
app.use((error, req, res, next) => {
  console.error(error.stack);
  res.status(500).json({ error: "Error interno del servidor" });
});

// Ruta 404 (debe ir al final)
app.use((req, res) => {
  res.status(404).json({ error: "Endpoint no encontrado" });
});

export default app;
