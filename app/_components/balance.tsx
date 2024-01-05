import { balanceArbitrum } from '../_utils/contract-actions/arbitrum'

type BalanceProps = {
  status: 'disconnected' | 'connected' | 'reconnecting' | 'connecting'
  address?: `0x${string}`
  onSuccess: (number: number) => void
}

export const Balance = ({ address, status, onSuccess }: BalanceProps) => {
  if (status === 'reconnecting' || status === 'connecting')
    return 'Fetching balance...'

  if (!address) return 'Connect wallet to check balance.'

  const { data, isError, isLoading } = balanceArbitrum(address, (data) =>
    onSuccess(Number(data)),
  )

  if (isLoading) return 'Fetching balance...'

  if (isError) return 'Error'

  return `Minted ${Number(data)} $LZNFT.`
}
