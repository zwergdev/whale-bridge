type BalanceIndicatorProps = {
  symbol?: string
  balance?: number
}

export const BalanceIndicator = ({
  symbol,
  balance,
}: BalanceIndicatorProps) => {
  return (
    <span className="mr-2 text-xs mb-1 opacity-75 text-primary leading-[0.4]">
      Bal: {Number.isNaN(balance) ? '0' : balance} {symbol ?? 'XXX'}
    </span>
  )
}
