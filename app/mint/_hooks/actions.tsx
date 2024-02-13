import { errorToaster } from '@/app/_utils/truncatedToaster'
import { getNextMintIdOpts } from '@/app/mint/_contracts/mint-contracts'
import { useReadContract, useWriteContract as writeContract } from 'wagmi'

export const useWriteContract = () =>
  writeContract({
    mutation: {
      onError(error) {
        errorToaster(error)
      },
    },
  })

export const useGetNextMintId = (chainId: number) => {
  const { refetch } = useReadContract(getNextMintIdOpts(chainId))

  return { refetch }
}
