import { z } from "zod";

const artistaSchema = z.object({
  body: z.object({
    nombre: z
      .string()
      .max(100, "El nombre no puede tener más de 100 caracteres"),
    imagen_url: z.string().url("La imagen debe ser una URL válida").optional(),
  }),
  params: z.object({}),
  query: z.object({}),
});

export { artistaSchema };
