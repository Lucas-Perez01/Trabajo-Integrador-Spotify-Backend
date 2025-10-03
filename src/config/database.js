/**
 * Configuración de conexión a la base de datos MySQL
 * Los estudiantes deben completar la configuración de la conexión
 */

// src/config/database.js
import { Sequelize } from "sequelize";

// Conexión a la base de datos MySQL usando variables de entorno
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST || "localhost",
    port: process.env.DBPORT,
    dialect: "mysql",
    pool: { max: 5, min: 0, acquire: 30000, idle: 10000 },
  }
);

// Prueba de conexión
export const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexión a la base de datos");
  } catch (error) {
    console.error("Error de conexión:", error);
  }
};

export default sequelize;
