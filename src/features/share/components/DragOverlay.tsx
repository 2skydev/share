'use client'

import { useEffect, useState } from 'react'

import { AnimatePresence, motion } from 'framer-motion'

import { cn } from '@/utils/tailwind.utils'

export interface DragOverlayProps {}

const DragOverlay = ({}: DragOverlayProps) => {
  const [dragging, setDragging] = useState(false)

  useEffect(() => {
    const handleDragOver = () => setDragging(true)
    const handleDrop = () => setDragging(false)

    const handleDragLeave = (e: any) => {
      if (
        e.clientX <= 0 ||
        e.clientY <= 0 ||
        e.clientX >= window.innerWidth ||
        e.clientY >= window.innerHeight
      ) {
        setDragging(false)
      }
    }

    window.addEventListener('dragover', handleDragOver)
    window.addEventListener('drop', handleDrop)
    window.addEventListener('dragleave', handleDragLeave)

    return () => {
      window.removeEventListener('dragover', handleDragOver)
      window.removeEventListener('drop', handleDrop)
      window.removeEventListener('dragleave', handleDragLeave)
    }
  }, [])

  return (
    <AnimatePresence initial={false}>
      {dragging && (
        <motion.div
          className="fixed z-[999] left-0 top-0 size-full bg-background/80 backdrop-blur-sm pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute size-full p-8"
            initial={{ opacity: 0, scale: 1.2 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            transition={{ type: 'spring' }}
          >
            <div className="border-dashed border-[3px] border-muted-foreground rounded-lg size-full" />
          </motion.div>

          <div
            className={cn(
              'flex flex-col items-center justify-center w-full h-full space-y-4',
              !dragging && 'opacity-0',
            )}
          >
            <p className="text-lg font-bold text-muted-foreground">파일을 놓아주세요</p>
            <p className="text-muted-foreground">파일을 끌어다 놓아 공유할 수 있습니다</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default DragOverlay
