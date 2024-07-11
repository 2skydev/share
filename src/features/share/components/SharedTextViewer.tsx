'use client'

import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'

import { cn } from '@/utils/tailwind.utils'

export interface SharedTextViewerProps {
  className?: string
  children: React.ReactNode
}

const SharedTextViewer = ({ className, children }: SharedTextViewerProps) => {
  return (
    <ScrollArea
      className={cn(
        'w-[calc(100vw-2rem-2px)] md:w-[calc(32rem-3rem)] h-64 md:h-64 whitespace-pre border border-border rounded-md p-4',
        className,
      )}
    >
      {children}
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}

export default SharedTextViewer
