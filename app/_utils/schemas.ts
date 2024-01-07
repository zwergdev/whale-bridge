import * as z from 'zod'

export const BridgeSchema = z.object({
  chainFrom: z.number(),
  chainTo: z.number(),
})

export const RefuelSchema = z
  .object({
    chainFrom: z.number(),
    chainTo: z.number(),
    amount: z.coerce.number().positive(),
    balance: z.number().positive(),
  })
  .refine((schema) => schema.amount <= schema.balance, {
    message: 'Amount must be less than balance',
  })
