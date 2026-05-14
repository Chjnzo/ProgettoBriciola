import * as React from 'react'
import { cn } from '@/lib/utils'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => (
    <input
      type={type}
      ref={ref}
      className={cn(
        'flex w-full rounded-sm border border-sand-dark bg-white px-4 py-3',
        'font-lora text-ink placeholder:text-ink-light/40',
        'transition-colors focus:outline-none focus:ring-2 focus:ring-terra/40 focus:border-terra',
        'disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    />
  )
)
Input.displayName = 'Input'

export { Input }
