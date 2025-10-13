import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const CancionGenero = sequelize.define(
  "CancionGenero",
  {
    id_cancion: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    id_genero: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
  },
  {
    tableName: "cancion_genero",
    timestamps: false,
  }
);

export default CancionGenero;
