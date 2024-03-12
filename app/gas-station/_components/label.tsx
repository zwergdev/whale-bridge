import { cn } from '@/lib/utils'

export const Label = ({
  children,
  className,
}: { children: React.ReactNode; className?: string }) => (
  <div
    className={cn(
      'absolute left-1.5 -top-2 text-[13px] text-ring/80 py-px bg-background border-ring border border-b-2 border-r-2 px-1 tracking-tighter leading-none',
      className,
    )}
  >
    {children}
  </div>
)
