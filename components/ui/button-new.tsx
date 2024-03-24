import { cn } from '@/lib/utils'
import { Loader } from '@/components/ui/icons'
import * as React from 'react'

export interface ButtonNewProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean
}

const ButtonNew = React.forwardRef<HTMLButtonElement, ButtonNewProps>(
  (
    { className, disabled, children, loading, ...props },
    ref,
  ) => {
    return (
      <button
        disabled={disabled || loading}
        type="button"
        ref={ref}
        {...props}
        className={cn(
          'group relative inline-flex px-14 py-3.5 text-xl items-center justify-center overflow-hidden rounded-md bg-primary font-medium text-foreground transition duration-300 hover:scale-110 disabled:hover:scale-100 disabled:cursor-not-allowed disabled:bg-muted',
          className,)}
      >
        {loading && <Loader className="mr-2 h-4 w-5 animate-spin-slow" />}
        <span>{children}</span>
        <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-disabled:hidden group-hover:[transform:skew(-12deg)_translateX(100%)]">
          <div className="relative h-full w-14 bg-white/20" />
        </div>
      </button>
    )
  },
)
ButtonNew.displayName = 'Button'

export { ButtonNew }
