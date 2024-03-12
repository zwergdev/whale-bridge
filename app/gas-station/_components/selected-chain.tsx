export const SelectedChain = (props: {
  name: string
  amount?: string
  usamount: number
  symbol: string
}) => (
  <div className="w-full flex text-sm leading-none items-center justify-between pt-1 pb-2 last-of-type:border-none border-b border-popover">
    {props.name}
    <span>
      {props.amount} {props.symbol}
      <span> (${props.usamount.toFixed(2)})</span>
    </span>
  </div>
)
