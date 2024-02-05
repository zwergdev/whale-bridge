export const RedeemedCode = ({ code }: { code: string }) => {
  return (
    <div className="mb-10 max-w-[440px] w-full mx-auto flex flex-col items-start justify-items-start text-lg font-semibold">
      Redeemed code
      <div className="flex items-center justify-center gap-4">
        <h6 className="px-6 min-w-72 h-12 rounded-xl bg-popover flex items-center justify-center mb-2">
          {code}
        </h6>
      </div>
    </div>
  )
}
