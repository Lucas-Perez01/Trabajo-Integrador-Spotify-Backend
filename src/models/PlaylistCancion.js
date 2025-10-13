// src/models/PlaylistCancion.js
import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const PlaylistCancion = sequelize.define(
  "PlaylistCancion",
  {
    id_playlist: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    id_cancion: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    orden: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fecha_agregada: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "playlist_cancion",
    timestamps: false,
  }
);

export default PlaylistCancion;
