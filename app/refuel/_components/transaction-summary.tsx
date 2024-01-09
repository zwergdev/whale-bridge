type TransactionSummaryProps = {
  time: string
  refuelCost: string
  output: string
}

export const TransactionSummary = ({time, refuelCost, output}:TransactionSummaryProps) => {
  return (
    <article className="bg-popover rounded-md md:pt-5 pt-3 px-4 max-w-xl mx-auto mb-11">
      <h3 className="font-semibold md:text-lg text-base md:mb-4 mb-2">
        Transaction Summary
      </h3>
      <div className="flex items-center justify-between w-full font-medium md:text-base text-xs py-2.5 border-t border-t-primary">
        Estimated Transfer Time:
        <span className="font-semibold">~{time} mins</span>
      </div>
      <div className="flex items-center justify-between w-full font-medium md:text-base text-xs py-2.5 border-t border-t-primary">
        Refuel cost:
        <span className="font-semibold">{refuelCost}</span>
      </div>
      <div className="flex items-center justify-between w-full font-medium md:text-base text-xs py-2.5 border-t border-t-primary md:mb-5 mb-2">
        Expected Output:
        <span className="font-semibold">{output}</span>
      </div>
    </article>
  )
}
