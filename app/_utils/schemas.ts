import * as z from 'zod'

export const BridgeSchema = z.object({
  balance: z.number().positive(),
  chainFrom: z.number(),
  chainTo: z.number(),
})

export const RefuelSchema = z.object({
  chainFrom: z.number(),
  chainTo: z.number(),
  amount: z.number().positive(),
})
