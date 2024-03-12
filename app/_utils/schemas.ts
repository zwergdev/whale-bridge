import * as z from 'zod'

export const BridgeSchema = z.object({
  chainFrom: z.number(),
  chainTo: z.number(),
  tokenId: z.string(),
  nfts: z.array(z.string()),
})
export type BridgeForm = z.infer<typeof BridgeSchema>

export const RefuelSchema = z.object({
  chainFrom: z.number(),
  chainTo: z.number(),
  amount: z.coerce.number().positive(),
})
export type RefuelForm = z.infer<typeof RefuelSchema>

export const TokenSchema = z.object({
  chainFrom: z.number(),
  chainTo: z.number(),
  tokenBalance: z.coerce.number().positive(),
  amount: z.string().optional(),
  bridgeAmount: z.string().optional(),
})
export type TokenForm = z.infer<typeof TokenSchema>

export const GasSchema = z.object({
  chainFrom: z.number(),
  address: z
    .string()
    .regex(new RegExp(/^0x[a-fA-F0-9]{40}$/), 'Invalid address!'),
  selectedChains: z.array(
    z.object({
      name: z.string(),
      logo: z.string(),
      v2Value: z.number(),
      chainId: z.string(),
      valueInEther: z.string().optional(),
    }),
  ),
})
export type GasForm = z.infer<typeof GasSchema>

export const MessengerSchema = z.object({
  chainFrom: z.number(),
  chainTo: z.number(),
  message: z.string().min(1).max(140),
})
export type MessengerForm = z.infer<typeof MessengerSchema>
