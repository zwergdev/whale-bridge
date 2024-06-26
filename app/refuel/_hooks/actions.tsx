import { useAccount, useReadContract } from 'wagmi'
import { estimateRefuelFeeOpts } from '../_contracts/refuel-contracts'

export const useEstimateRefuelFee = (
  chainTo: number,
  chainId: number,
  amount: number,
) => {
  const { address } = useAccount()

  const { refetch } = useReadContract(
    estimateRefuelFeeOpts(chainTo, chainId, address!, amount),
  )

  return { refetchFee: refetch }
}
