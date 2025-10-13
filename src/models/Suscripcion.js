/**
 * Modelo Suscripcion
 * Los estudiantes deben implementar todas las operaciones CRUD para suscripciones
 */

import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const Suscripcion = sequelize.define(
  "Suscripcion",
  {
    id_suscripcion: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tipo_usuario: {
      type: DataTypes.ENUM("free", "standard", "premium"),
      allowNull: false,
    },
    fecha_inicio: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    fecha_renovacion: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isAfterStart(value) {
          if (this.fecha_inicio && value <= this.fecha_inicio) {
            throw new Error("fecha_renovacion debe ser mayor que fecha_inicio");
          }
        },
      },
    },
  },
  {
    tableName: "suscripcion",
    timestamps: false,
  }
);

export default Suscripcion;
