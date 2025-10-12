// src/schemas/cancion.js
import { z } from "zod";

const cancionSchema = z.object({
  body: z.object({
    titulo: z.string().min(1).max(100),
    duracion_seg: z.preprocess(
      (val) => Number(val),
      z.number().int().positive()
    ),
    id_album: z.preprocess((val) => Number(val), z.number().int().positive()),
  }),
});

export { cancionSchema };
