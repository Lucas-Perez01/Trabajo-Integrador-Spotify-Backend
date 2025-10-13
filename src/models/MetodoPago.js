/**
 * Modelo MetodoPago
 * Los estudiantes deben implementar todas las operaciones CRUD para métodos de pago
 */

// src/models/MetodoPago.js
import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const MetodoPago = sequelize.define(
  "MetodoPago",
  {
    id_metodo_pago: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tipo_forma_pago: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    cbu: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    banco_codigo: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    nro_tarjeta_masc: {
      type: DataTypes.CHAR(4),
      allowNull: false,
    },
    mes_caduca: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
    anio_caduca: {
      type: DataTypes.SMALLINT,
      allowNull: true,
    },
  },
  {
    tableName: "metodo_pago",
    timestamps: false,
  }
);

export default MetodoPago;
