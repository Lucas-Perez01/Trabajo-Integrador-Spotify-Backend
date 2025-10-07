// src/models/Usuario.js
import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

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
      field: "password_hash",
      allowNull: false,
    },
    fecha_nac: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    sexo: {
      type: DataTypes.CHAR(1),
      allowNull: true,
    },
    cp: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    id_pais: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tipo_usuario_actual: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    fecha_ult_mod_password: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "usuario",
    timestamps: false,
  }
);

export default Usuario;
