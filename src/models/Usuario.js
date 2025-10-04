/**
 * Modelo Usuario
 * Los estudiantes deben implementar todas las operaciones CRUD para usuarios
 */

// src/models/Usuario.js
import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

// Modelo Usuario

const Usuario = sequelize.define(
  "Usuario",
  {
    id_usuario: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    fecha_nacimiento: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    sexo: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    codigo_postal: {
      type: DataTypes.STRING(30),
    },
    pais: {
      type: DataTypes.STRING(40),
      allowNull: false,
    },
    fecha_modificacion_password: {
      type: DataTypes.DATE,
    },
  },
  {
    tableName: "usuario",
    timestamps: false,
  }
);

export default Usuario;
