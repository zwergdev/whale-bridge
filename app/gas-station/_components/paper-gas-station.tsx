export const PaperGasStation = ({
  children,
  width,
}: { children: React.ReactNode; width?: string }) => {
  return (
    <div
      className={`gap-5 text-sm text-foreground rounded-md border-popover border overflow-hidden ${
        width ?? 'w-max'
      } p-6 relative bg-[#011e37]/30 backdrop-blur-md flex flex-col`}
    >
      <div className="w-20 h-32 -z-10 bg-primary blur-[150px] absolute -bottom-20 left-0" />
      <div className="w-20 h-32 -z-10 bg-primary blur-[200px] absolute -top-20 right-20" />
      {children}
    </div>
  )
}
