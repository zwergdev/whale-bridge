import { useBalance } from 'wagmi'
import { useGetAccount } from './use-get-account'

export const useGetBalance = () => {
  const { address } = useGetAccount()
  const { data: _balanceFrom } = useBalance({
    address,
    query: {
      enabled: !!address,
    },
  })

  const balanceFrom = Number(Number(_balanceFrom?.formatted).toFixed(5))

  return {
    symbol: _balanceFrom?.symbol ?? 'XXX',
    balanceFrom: balanceFrom,
    infoBalanceFrom: _balanceFrom,
  }
}

export const useGetBalanceTo = (chainId: number) => {
  const { address } = useGetAccount()
  const { data: _balanceTo } = useBalance({
    chainId: chainId,
    address,
    query: {
      enabled: !!address,
    },
  })
  const balanceTo = Number(Number(_balanceTo?.formatted).toFixed(5))

  return {
    balanceTo,
    infoBalanceTo: _balanceTo,
    symbolTo: _balanceTo?.symbol ?? 'XXX',
  }
}
