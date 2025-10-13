/**
 * Controlador de Playlists
 * Los estudiantes deben implementar toda la lógica de negocio para playlists
 */

import Playlist from "../models/Playlist.js";
import Usuario from "../models/Usuario.js";
import Cancion from "../models/Cancion.js";
import PlaylistCancion from "../models/PlaylistCancion.js";

// Crear playlist
const createPlaylist = async (req, res) => {
  try {
    const { titulo, id_usuario } = req.validated.body;

    // Verificar que el usuario exista
    const usuario = await Usuario.findByPk(id_usuario);
    if (!usuario) {
      return res.status(404).json({
        error: { code: 404, message: "El usuario no existe" },
      });
    }

    const playlist = await Playlist.create({ titulo, id_usuario });
    res.status(201).json(playlist);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: {
        code: 500,
        message: "Error al crear playlist",
        details: error.message,
      },
    });
  }
};

// Soft-delete playlist
const softDeletePlaylist = async (req, res) => {
  try {
    const { id } = req.params;
    const { estado, fecha_eliminada } = req.validated.body;

    const playlist = await Playlist.findByPk(id);
    if (!playlist) {
      return res.status(404).json({ error: "Playlist no encontrada" });
    }

    playlist.estado = estado;
    playlist.fecha_eliminada = fecha_eliminada;
    await playlist.save();

    res
      .status(200)
      .json({ message: "Playlist eliminada correctamente", playlist });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: {
        code: 500,
        message: "Error al eliminar playlist",
        details: error.message,
      },
    });
  }
};

// Agregar canción a playlist
const addCancionToPlaylist = async (req, res) => {
  try {
    const { id } = req.params; // id_playlist
    const { id_cancion, orden } = req.validated.body;

    // Verificar playlist
    const playlist = await Playlist.findByPk(id);
    if (!playlist) {
      return res.status(404).json({ error: "Playlist no encontrada" });
    }

    // Verificar canción
    const cancion = await Cancion.findByPk(id_cancion);
    if (!cancion) {
      return res.status(404).json({ error: "Canción no encontrada" });
    }

    // Crear relación
    const relacion = await PlaylistCancion.create({
      id_playlist: id,
      id_cancion,
      orden,
    });

    res.status(201).json(relacion);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: {
        code: 500,
        message: "Error al agregar canción a playlist",
        details: error.message,
      },
    });
  }
};

// Quitar canción de playlist
const removeCancionFromPlaylist = async (req, res) => {
  try {
    const { id, id_cancion } = req.params; // id_playlist, id_cancion

    const eliminado = await PlaylistCancion.destroy({
      where: { id_playlist: id, id_cancion },
    });

    if (!eliminado) {
      return res
        .status(404)
        .json({ error: "Canción no encontrada en la playlist" });
    }

    res
      .status(200)
      .json({ message: "Canción eliminada de la playlist correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: {
        code: 500,
        message: "Error al eliminar canción de playlist",
        details: error.message,
      },
    });
  }
};

export {
  createPlaylist,
  softDeletePlaylist,
  addCancionToPlaylist,
  removeCancionFromPlaylist,
};
