/**
 * Punto de entrada del servidor
 * Los estudiantes deben completar la configuración del servidor Express
 */

// TODO: Configurar el servidor para escuchar en el puerto especificado
// TODO: Agregar manejo de errores del servidor
// TODO: Agregar logs de inicio del servidor

// server.js
import app from "./src/app.js";

const PORT = process.env.PORT || 3000;

// Iniciar servidor
const server = app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

// Manejo de errores del servidor
server.on("error", (error) => {
  console.error("Error al iniciar el servidor:", error);
  process.exit(1);
});
