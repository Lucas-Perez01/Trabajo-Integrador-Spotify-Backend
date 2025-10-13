/**
 * Modelo Cancion
 * Los estudiantes deben implementar todas las operaciones CRUD para canciones
 */

import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import Genero from "./Genero.js";
import CancionGenero from "./CancionGenero.js";

const Cancion = sequelize.define(
  "Cancion",
  {
    id_cancion: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    titulo: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    duracion_seg: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: { msg: "La duración debe estar en segundos (entero positivo)" },
        min: 1,
      },
    },
    id_album: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    reproducciones: {
      type: DataTypes.BIGINT,
      defaultValue: 0,
    },
    likes: {
      type: DataTypes.BIGINT,
      defaultValue: 0,
    },
    fecha_agregada: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "cancion",
    timestamps: false,
  }
);

Cancion.belongsToMany(Genero, {
  through: CancionGenero,
  foreignKey: "id_cancion",
  otherKey: "id_genero",
});

export default Cancion;
