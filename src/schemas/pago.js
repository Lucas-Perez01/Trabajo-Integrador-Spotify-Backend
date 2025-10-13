// src/schemas/pago.js
import { z } from "zod";

const pagoSchema = z.object({
  body: z.object({
    id_usuario: z.preprocess((val) => Number(val), z.number().int().positive()),
    id_suscripcion: z.preprocess(
      (val) => Number(val),
      z.number().int().positive()
    ),
    id_metodo_pago: z.preprocess(
      (val) => Number(val),
      z.number().int().positive()
    ),
    importe: z.preprocess((val) => Number(val), z.number().positive()),
    fecha_pago: z.string().datetime(),
  }),
});

export { pagoSchema };
