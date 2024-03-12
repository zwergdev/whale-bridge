type SelectedChainsProps = {
  children: React.ReactNode
  total: number
  qty: number
}

export const SelectedChains = ({ children }: SelectedChainsProps) => {
  return (
    <div className="w-full border border-ring bg-[#011e37]/30 p-2 relative rounded-md">
      <p className="mb-2">Selected Chains</p>
      <div className="w-full flex items-center justify-center flex-col px-2 py-1.5 gap-1 border border-popover rounded-md">
        {children}
      </div>
    </div>
  )
}
