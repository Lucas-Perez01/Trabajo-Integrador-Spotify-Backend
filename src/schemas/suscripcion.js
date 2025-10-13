import { z } from "zod";

const suscripcionSchema = z.object({
  body: z.object({
    id_usuario: z.preprocess((val) => Number(val), z.number().int().positive()),
    id_tipo_usuario: z.preprocess(
      (val) => Number(val),
      z.number().int().positive()
    ),
    fecha_inicio: z.string(),
    fecha_renovacion: z.string(),
  }),
});

export { suscripcionSchema };
