'use client'

import { forwardRef } from 'react'

import { cn } from '@/utils/tailwind.utils'

export interface ConnectVisualCircleProps {
  className?: string
  children?: React.ReactNode
}

const ConnectVisualCircle = forwardRef<HTMLDivElement, ConnectVisualCircleProps>(
  ({ className, children }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 bg-white p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]',
          className,
        )}
      >
        {children}
      </div>
    )
  },
)

ConnectVisualCircle.displayName = 'ConnectVisualCircle'

export default ConnectVisualCircle
