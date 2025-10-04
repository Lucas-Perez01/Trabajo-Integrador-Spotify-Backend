// src/schemas/usuario.js
import { z } from "zod";

const createUsuarioSchema = z.object({
  body: z.object({
    email: z.string().email("Email inválido"),
    password: z.string().min(6, "Password debe tener al menos 6 caracteres"),
    fecha_nac: z.string().nonempty("Fecha de nacimiento es obligatoria"),
    sexo: z.enum(["F", "M"], "Sexo debe ser F o M"),
    cp: z.string().nonempty("Código postal es obligatorio"),
    id_pais: z.number(),
    tipo_usuario_actual: z.number(),
  }),
});

const updateUsuarioSchema = z.object({
  body: z.object({
    email: z.string().email().optional(),
    password: z.string().min(6).optional(),
    fecha_nac: z.string().optional(),
    sexo: z.enum(["F", "M"]).optional(),
    cp: z.string().optional(),
    id_pais: z.number().optional(),
    tipo_usuario_actual: z.number().optional(),
  }),
  params: z.object({
    id: z.string().regex(/^\d+$/, "ID debe ser un número entero"),
  }),
});

const getUsuarioSchema = z.object({
  params: z.object({
    id: z.string().regex(/^\d+$/, "ID debe ser un número entero"),
  }),
});

export { createUsuarioSchema, updateUsuarioSchema, getUsuarioSchema };
