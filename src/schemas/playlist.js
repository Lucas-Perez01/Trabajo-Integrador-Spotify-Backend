// src/schemas/playlist.js
import { z } from "zod";

const playlistSchema = z.object({
  body: z.object({
    titulo: z.string().min(1).max(100),
    id_usuario: z.preprocess((val) => Number(val), z.number().int().positive()),
  }),
});

const playlistSoftDeleteSchema = z.object({
  body: z.object({
    estado: z.literal("eliminada"),
    fecha_eliminada: z.string({
      required_error: "fecha_eliminada es obligatoria al eliminar",
    }),
  }),
});

const playlistCancionSchema = z.object({
  body: z.object({
    id_cancion: z.preprocess((val) => Number(val), z.number().int().positive()),
    orden: z.preprocess((val) => Number(val), z.number().int().positive()),
  }),
});

export { playlistSchema, playlistSoftDeleteSchema, playlistCancionSchema };
