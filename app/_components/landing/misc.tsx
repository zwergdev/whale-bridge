import { cn } from '@/lib/utils'

type SectionWrapperProps = {
  children: React.ReactNode
  titleClassName?: string
  sectionClassName?: string
  title: string
}

export const SectionWrapper = ({
  children,
  titleClassName,
  sectionClassName,
  title,
}: SectionWrapperProps) => {
  return (
    <section className={cn('max-w-screen-xl mx-auto relative w-full', sectionClassName)}>
      <h2
        className={cn(
          'md:text-4xl text-2xl text-foreground text-center font-semibold',
          titleClassName,
        )}
      >
        {title}
      </h2>
      {children}
    </section>
  )
}
