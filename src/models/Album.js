// src/models/Album.js
import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const Album = sequelize.define(
  "Album",
  {
    id_album: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    titulo: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    id_artista: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_discografica: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    imagen_portada: {
      type: DataTypes.BLOB,
      allowNull: true,
    },
    anio_publicacion: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: "album",
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ["id_artista", "titulo"],
      },
    ],
  }
);

export default Album;
