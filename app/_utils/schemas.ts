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

export const GasStationSchema = z.object({
  chainFrom: z.number(),
  // selectChain: z.array(z.number())
  selectedChain: z.array(
    z.object({
      chain: z.string(),
      chainId: z.number(),
      amount: z.number().optional(),
    }),
  ),
})
export type TokenForm = z.infer<typeof TokenSchema>

export const MessengerSchema = z.object({
  chainFrom: z.number(),
  chainTo: z.number(),
  message: z.string().min(1).max(140),
})
export type MessengerForm = z.infer<typeof MessengerSchema>
