import * as z from "zod"
import { Currency } from "@prisma/client"

export const bondSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  isin: z.string(),
  currency: z.nativeEnum(Currency),
})
