import { useContractRead } from 'wagmi'
import { arbitrumABI } from '../_utils/abi/arbitrum'

type BalanceProps = {
  status: 'disconnected' | 'connected' | 'reconnecting' | 'connecting'
  address?: `0x${string}`
  onSuccess: (number: number) => void
}

export const Balance = ({ address, status, onSuccess }: BalanceProps) => {
  if (status === 'reconnecting' || status === 'connecting')
    return 'Fetching balance...'

  if (!address) return <>Connect wallet to check balance.</>

  const { data, isError, isLoading } = useContractRead({
    address: '0xa0d013b84FBAeFF5AbFc92A412a44572382dCA08',
    abi: arbitrumABI,
    functionName: 'balanceOf',
    chainId: 42170,
    args: [address],
    suspense: true,
    onSuccess(data) {
      onSuccess(Number(data))
    },
  })

  if (isLoading) return 'Minted ... $LZNFT.'

  if (isError) return 'Error'

  return `Minted ${Number(data)} $LZNFT.`
}
