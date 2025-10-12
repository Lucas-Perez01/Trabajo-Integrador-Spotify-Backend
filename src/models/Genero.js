/**
 * Modelo Genero
 * Los estudiantes deben implementar todas las operaciones CRUD para géneros
 */

// src/models/Genero.js
import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const Genero = sequelize.define(
  "Genero",
  {
    id_genero: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
  },
  {
    tableName: "genero",
    timestamps: false,
  }
);

export default Genero;
