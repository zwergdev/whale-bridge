import { balance } from '../_utils/contract-actions'

type BalanceProps = {
  status: 'disconnected' | 'connected' | 'reconnecting' | 'connecting'
  address?: `0x${string}`
  onSuccess: (number: number) => void
  chainId: number
}

export const Balance = ({
  address,
  status,
  onSuccess,
  chainId,
}: BalanceProps) => {
  if (status === 'reconnecting' || status === 'connecting')
    return 'Fetching balance...'

  if (!address) return 'Connect wallet to check balance.'

  const { data, isError, isLoading } = balance(
    address,
    (data) => onSuccess(Number(data)),
    chainId,
  )

  if (isLoading) return 'Fetching balance...'

  if (isError) return 'Error'

  return `Minted ${Number(data)} $LZNFT.`
}
