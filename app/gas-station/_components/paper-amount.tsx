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
