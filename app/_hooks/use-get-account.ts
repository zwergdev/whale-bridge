import { formatEther } from 'viem'
import { useAccount, useBalance } from 'wagmi'

export const useGetAccount = () => {
  const { address, chain, status } = useAccount()

  const { data } = useBalance({
    address,
    query: { enabled: !!address },
  })

  return {
    balance: data?.value ? Number(formatEther(data.value)) : 0,
    symbol: data?.symbol,
    chainId: chain?.id ?? 0,
    chain,
    address,
    status,
  }
}