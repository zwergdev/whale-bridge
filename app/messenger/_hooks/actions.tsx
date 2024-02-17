import { estimateMessageFeeOpts } from '@/app/messenger/_contracts/messenger-contracts'
import { useAccount, useReadContract } from 'wagmi'

export const useEstimateRefuelFee = (
  chainTo: number,
  chainId: number,
  message: string,
) => {
  const { address } = useAccount()

  const { refetch } = useReadContract(
    estimateMessageFeeOpts(chainTo, chainId, address!, message),
  )

  return { refetchFee: refetch }
}
