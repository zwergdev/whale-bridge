import * as z from 'zod'

export const BridgeSchema = z.object({
  chainFrom: z.number(),
  chainTo: z.number(),
  tokenId: z.string(),
  nfts: z.array(z.string()),
})

export const RefuelSchema = z.object({
  chainFrom: z.number(),
  chainTo: z.number(),
  amount: z.coerce.number().positive(),
})

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
  selectChain: z.array(
    z.object({
      chain: z.number(),
      amount: z.number().optional(),
    }),
  ),
})
