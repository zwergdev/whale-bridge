import { getNextMintIdOpts } from '@/app/mint/_contracts/mint-contracts'
import { useReadContract } from 'wagmi'

export const useGetNextMintId = (chainId: number) => {
  const { refetch } = useReadContract(getNextMintIdOpts(chainId))

  return { refetch }
}
