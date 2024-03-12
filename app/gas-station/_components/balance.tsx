type BalanceProps = {
  balance?: number
  fromSymbol?: string
  usd?: number
}

export const Balance = ({ balance, fromSymbol, usd }: BalanceProps) => (
  <div className="hidden sm:flex flex-col items-center justify-center relative text-xl text-black leading-none w-36 h-[50px] outline outline-1 outline-muted-foreground outline-offset-0 tracking-tighter border border-background before:absolute before:w-full before:h-full before:border-2 before:border-black">
    {balance?.toFixed(3)} {fromSymbol}
    <span className="text-base opacity-30 leading-none tracking-tighter">
      (${balance && usd ? (balance * usd).toFixed(2) : '0.00'})
    </span>
  </div>
)
