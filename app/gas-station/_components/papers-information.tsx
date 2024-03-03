export const PaperAmount = ({
  selectedChains,
}: {
  selectedChains: {
    chain: string
    chainId: number
    amount?: number
  }[]
}) => {
  let totalAmount = 0
  for (let i = 0; i < selectedChains.length; i++) {
    totalAmount += selectedChains[i].amount ?? 0
  }
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
  selectedChains,
}: {
  selectedChains: {
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
        {selectedChains.length === 0 ? (
          <span>None</span>
        ) : (
          selectedChains.map(({ chain, amount }, index) => (
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
