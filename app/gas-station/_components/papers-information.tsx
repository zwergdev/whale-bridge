export const PaperAmount = ({
  totalAmount,
}: {
  totalAmount: number
}) => {
  return (
    <article className="p-5 w-full flex flex-col gap-4 bg-paper rounded-xl">
      <h2 className="text-xl">Destination Amount</h2>
      <div className="bg-popover w-full h-px" />
      <div className="w-full justify-between flex">
        <span className="text-primary">Total amount:</span>
        <span>{totalAmount}</span>
      </div>
    </article>
  )
}

export const PaperSelectedChain = ({
  selectedChain,
}: {
  selectedChain: {
    chain: string
    chainId: number
    amount?: number
  }[]
}) => {
  return (
    <article className="p-5 w-full flex flex-col gap-4 bg-paper rounded-xl">
      <h2 className="text-xl">Selected Chains:</h2>
      <div className="bg-popover w-full h-px" />
      <div className="w-full">
        {selectedChain.length === 0 ? (
          <span>None</span>
        ) : (
          selectedChain.map(({ chain, amount }, index) => (
            <div key={index} className="flex items-center justify-between">
              <span>{chain}</span>
              <span>{amount ? amount : '0'}</span>
            </div>
          ))
        )}
      </div>
    </article>
  )
}
