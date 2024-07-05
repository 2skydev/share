'use client'

import { cn } from '@/utils/tailwind.utils'

export interface SharedTextViewerProps {
  className?: string
  children: React.ReactNode
}

const SharedTextViewer = ({ className, children }: SharedTextViewerProps) => {
  return (
    <div
      className={cn(
        'whitespace-pre overflow-x-scroll border border-border rounded-md p-4',
        className,
      )}
    >
      {children}
    </div>
  )
}

export default SharedTextViewer
