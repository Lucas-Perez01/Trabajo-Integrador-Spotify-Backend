// src/schemas/album.js
import { z } from "zod";

const albumSchema = z.object({
  body: z.object({
    titulo: z
      .string()
      .min(1, "El título es obligatorio")
      .max(100, "El título no puede tener más de 100 caracteres"),
    id_artista: z.coerce
      .number({ invalid_type_error: "id_artista debe ser un número" })
      .int()
      .positive(),
    id_discografica: z.coerce
      .number({ invalid_type_error: "id_discografica debe ser un número" })
      .int()
      .positive(),
    imagen_portada: z.string().url("Debe ser una URL válida").optional(),
    anio_publicacion: z.coerce
      .number({
        invalid_type_error: "anio_publicacion debe ser un número",
      })
      .int()
      .min(1900, "El año no puede ser menor a 1900")
      .max(new Date().getFullYear(), "El año no puede ser del futuro")
      .optional(),
  }),
});

export { albumSchema };
