import { errorToaster } from '@/app/_utils/truncatedToaster'
import {
  useAccount,
  useReadContract,
  useWriteContract as writeContract,
} from 'wagmi'
import { estimateRefuelFeeOpts } from '../_contracts/refuel-contracts'

export const useWriteContract = () =>
  writeContract({
    mutation: {
      onError(error) {
        errorToaster(error)
      },
    },
  })

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
