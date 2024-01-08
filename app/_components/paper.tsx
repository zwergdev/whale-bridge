type PaperProps = {
  title: string
  children: React.ReactNode
  icon?: React.ReactNode
}

export const Paper = ({ title, children, icon }: PaperProps) => {
  return (
    <section className="text-sm text-foreground rounded-md max-w-screen-md w-full px-6 pt-8 pb-10 bg-paper flex flex-col">
      <div className="flex justify-between">
        <h2 className="font-semibold text-2xl mb-5">{title}</h2>
        {icon}
      </div>
      {children}
    </section>
  )
}
