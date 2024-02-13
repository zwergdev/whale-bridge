import { errorToaster } from '@/app/_utils/truncatedToaster'
import {
  useAccount,
  useReadContract,
  useWriteContract as writeContract,
} from 'wagmi'
import {
  estimateBridgeFeeOpts,
  getModernUserNFTIdsOpts,
  getUserNFTIdsOpts,
} from '../_contracts/bridge-contracts'

export const useWriteContract = () =>
  writeContract({
    mutation: {
      onError(error) {
        errorToaster(error)
      },
    },
  })

export const useEstimateBridgeFee = (
  chainTo: number,
  tokenId: bigint,
  chainId: number,
) => {
  const { address } = useAccount()

  const { refetch } = useReadContract(
    estimateBridgeFeeOpts(chainTo, address!, tokenId, chainId),
  )

  return { refetchFee: refetch }
}

export const useGetUserNFTIds = (chainId: number) => {
  const { address } = useAccount()

  const { refetch } = useReadContract(getUserNFTIdsOpts(address!, chainId))

  return { refetchUserNFT: refetch }
}

export const useGetModernUserNFTIds = (chainId: number) => {
  const { address } = useAccount()

  const { refetch } = useReadContract(
    getModernUserNFTIdsOpts(address!, chainId),
  )

  return { refetchModernUserNFT: refetch }
}
