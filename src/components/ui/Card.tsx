import * as React from 'react'
import { cn } from '../../lib/utils'

export const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'group relative overflow-hidden rounded-[18px] bg-white shadow-[var(--shadow-card)] transition-[box-shadow,transform] duration-300 ease-out',
        'hover:shadow-[var(--shadow-hover)] hover:-translate-y-1',
        className,
      )}
      {...props}
    />
  ),
)
Card.displayName = 'Card'

export const CardMedia = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('relative overflow-hidden bg-cream-50', className)} {...props} />
  ),
)
CardMedia.displayName = 'CardMedia'

export const CardBody = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn('p-6', className)} {...props} />,
)
CardBody.displayName = 'CardBody'
