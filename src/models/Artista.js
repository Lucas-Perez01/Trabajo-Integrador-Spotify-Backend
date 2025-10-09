/**
 * Modelo Artista
 * Los estudiantes deben implementar todas las operaciones CRUD para artistas
 */

// src/models/Artista.js
import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const Artista = sequelize.define(
  "Artista",
  {
    id_artista: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    imagen_url: {
      type: DataTypes.BLOB,
      allowNull: true,
    },
  },
  {
    tableName: "artista",
    timestamps: false,
  }
);

export default Artista;
