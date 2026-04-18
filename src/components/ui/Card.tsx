import * as React from 'react'
import { cn } from '../../lib/utils'

export const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'group relative overflow-hidden rounded-3xl bg-white border border-brand-100 shadow-[0_2px_12px_-4px_rgba(15,74,48,0.08)] transition-all duration-500',
        'hover:border-brand-200 hover:shadow-[0_24px_48px_-16px_rgba(15,74,48,0.18)] hover:-translate-y-1',
        className,
      )}
      {...props}
    />
  ),
)
Card.displayName = 'Card'

export const CardMedia = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'relative overflow-hidden bg-gradient-to-br from-brand-50 to-cream-100',
        className,
      )}
      {...props}
    />
  ),
)
CardMedia.displayName = 'CardMedia'

export const CardBody = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('p-5 sm:p-6', className)} {...props} />
  ),
)
CardBody.displayName = 'CardBody'
