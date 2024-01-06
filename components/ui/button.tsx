import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'
import { Loader } from 'lucide-react'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-xl font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2  disabled:opacity-50 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        default:
          'text-foreground bg-gradient-to-b from-primary to-[#035D79] rounded-[10px]',
        clean: '',
        outline:
          'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary:
          'bg-black relative before:w-full before:h-full before:scale-x-[1.05] before:scale-y-[1.08] before:absolute before:top-[50%] before:left-[50%] before:-z-10 before:translate-x-[-50%] before:translate-y-[-50%] before:from-[#07C0FB] before:to-[#035D79] before:bg-gradient-to-b before:rounded-md',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'px-14 py-3.5',
        sm: 'py-2.5 px-6',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, disabled,children, loading, size, ...props },
    ref,
  ) => {

    return (
      <button
      type='button'
        className={cn(
          buttonVariants({ variant, size, className })
        )}
        disabled={disabled || loading}
        ref={ref}
        {...props}
      >
        {loading && <Loader className="mr-1 h-4 w-4 animate-spin-slow" />}
        {children}
      </button>
    )
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
