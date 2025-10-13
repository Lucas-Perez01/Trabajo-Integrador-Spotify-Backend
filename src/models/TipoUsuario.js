// src/models/TipoUsuario.js
import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const TipoUsuario = sequelize.define(
  "TipoUsuario",
  {
    id_tipo_usuario: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre_tipo: {
      type: DataTypes.ENUM("free", "standard", "premium"),
      allowNull: false,
      unique: true,
    },
  },
  {
    tableName: "tipo_usuario",
    timestamps: false,
  }
);

export default TipoUsuario;
