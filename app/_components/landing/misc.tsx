import { cn } from '@/lib/utils'

type SectionWrapperProps = {
  children: React.ReactNode
  className?: string
  title: string
  description?: string
}

export const SectionWrapper = ({
  children,
  className,
  title,
  description,
}: SectionWrapperProps) => {
  return (
    <section
      className={cn('max-w-screen-xl mx-auto relative w-full', className)}
    >
      <div>
        <h2 className="md:text-6xl text-5xl bg-gradient-to-r from-primary to-foreground bg-clip-text text-transparent text-center font-bold">
          {title}
        </h2>
        <p className="ml-2 mt-1 text-muted-foreground text-center">
          {description}
        </p>
      </div>
      {children}
    </section>
  )
}
