export const RedeemedCode = ({ code }: { code: string }) => {
  return (
    <div className="mb-10 sm:max-w-[440px] max-w-[320px] w-full mx-auto flex flex-col items-start justify-items-start text-lg font-semibold">
      Redeemed code
      <div className="flex-row-center gap-4">
        <h6 className="px-6 sm:min-w-72 w-auto h-12 rounded-xl bg-popover flex-row-center mb-2">
          {code}
        </h6>
      </div>
    </div>
  )
}
