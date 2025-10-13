/**
 * Modelo Playlist
 * Los estudiantes deben implementar todas las operaciones CRUD para playlists
 */

import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const Playlist = sequelize.define(
  "Playlist",
  {
    id_playlist: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    titulo: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    estado: {
      type: DataTypes.ENUM("activa", "eliminada"),
      defaultValue: "activa",
    },
    fecha_creacion: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    fecha_eliminada: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "playlist",
    timestamps: false,
  }
);

export default Playlist;
