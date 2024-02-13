import { errorToaster } from '@/app/_utils/truncatedToaster'
import { parseEther } from 'viem'
import {
  useAccount,
  useBalance,
  useReadContract,
  useWriteContract as writeContract,
} from 'wagmi'
import {
  estimateBridgeTokenFee,
  getTokenBalance,
} from '../_contracts/token-contracts'

export const useWriteContract = () =>
  writeContract({
    mutation: {
      onError(error) {
        errorToaster(error)
      },
    },
  })

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

export const useGetBalance = () => {
  const { address } = useAccount()

  const { data } = useBalance({
    address,
    query: { enabled: !!address },
  })
  const balance = Number(Number(data?.formatted).toFixed(5))

  return { balance, symbol: data?.symbol }
}
