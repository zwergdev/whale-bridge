import { parseEther } from 'viem'
import { useAccount, useBalance, useReadContract } from 'wagmi'
import {
  estimateBridgeTokenFee,
  getTokenBalance,
} from '../_contracts/token-contracts'

export const useGetTokenBalance = (selectedChainId: number) => {
  const { address } = useAccount()

  const { refetch: refetchBalance } = useReadContract(
    getTokenBalance(selectedChainId, address!),
  )

  return { refetchBalance }
}

export const useGetTokenFee = (
  chainTo: number,
  selectedChainId: number,
  amount?: string,
) => {
  const { address } = useAccount()

  const { refetch: refetchFee } = useReadContract(
    estimateBridgeTokenFee(
      chainTo,
      selectedChainId,
      address!,
      parseEther(amount ?? '0'),
    ),
  )

  return { refetchFee }
}
