import * as React from 'react'

import { cn } from '@/lib/utils'

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          'flex min-h-20 w-full rounded-md border transition-colors duration-300 border-[#0d3b63]/50 bg-paper hover:bg-popover px-3 py-2 text-base font-medium ring-offset-background placeholder:text-muted-foreground placeholder:font-normal focus-visible:outline-none focus-visible:border-primary focus-visible:bg-popover disabled:cursor-not-allowed disabled:opacity-50 selection:bg-paper',
          className,
        )}
        ref={ref}
        {...props}
      />
    )
  },
)
Textarea.displayName = 'Textarea'

export { Textarea }
