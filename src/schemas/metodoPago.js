import { z } from "zod";

const metodoPagoSchema = z.object({
  body: z.object({
    id_usuario: z.preprocess((val) => Number(val), z.number().int().positive()),
    tipo_forma_pago: z.string().min(1),
    nro_tarjeta: z.string().min(13).max(19),
    mes_caduca: z.preprocess(
      (val) => Number(val),
      z.number().int().min(1).max(12)
    ),
    anio_caduca: z.preprocess((val) => Number(val), z.number().int().min(2000)),
    banco_codigo: z.string().min(1).max(10),
  }),
  params: z.object({}).optional(),
  query: z.object({}).optional(),
});

export { metodoPagoSchema };
