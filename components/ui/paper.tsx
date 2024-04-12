type PaperProps = {
  title: string
  subtitle?: React.ReactNode
  children: React.ReactNode
}
export const Paper = ({ title, children, subtitle }: PaperProps) => {
  return (
    <section className="w-full min-h-[calc(100vh-160px)] flex-row-center pt-40">
      <div className="text-sm text-foreground rounded-md border-popover border max-w-screen-md overflow-hidden w-full p-6 relative bg-[#011e37]/30 backdrop-blur-md flex flex-col">
        <div className="container-absolute blur-[150px] -bottom-20 left-0" />
        <div className="container-absolute blur-[200px] -top-20 right-20" />

        <div className="flex justify-between items-start">
          <h2 className="font-semibold text-2xl mb-5">{title}</h2>
          {subtitle}
        </div>
        {children}
      </div>
    </section>
  )
}
