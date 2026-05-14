import { cn } from '@/lib/utils'

interface EyebrowProps {
  children: React.ReactNode
  className?: string
  center?: boolean
}

export function Eyebrow({ children, className, center = false }: EyebrowProps) {
  return (
    <p
      className={cn(
        'font-sans text-[0.78rem] font-semibold tracking-[.14em] uppercase text-terra',
        'flex items-center gap-2',
        'before:content-[""] before:inline-block before:w-7 before:h-px before:bg-terra before:shrink-0',
        center && 'justify-center',
        className
      )}
    >
      {children}
    </p>
  )
}
