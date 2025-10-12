// src/schemas/genero.js
import { z } from "zod";

const generoSchema = z.object({
  body: z.object({
    nombre: z
      .string({
        required_error: "El nombre es obligatorio",
        invalid_type_error: "El nombre debe ser una cadena de texto",
      })
      .min(1, "El nombre no puede estar vacío")
      .max(100, "El nombre no puede tener más de 100 caracteres"),
  }),
});

export { generoSchema };
