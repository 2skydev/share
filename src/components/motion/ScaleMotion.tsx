'use client'

import { ReactNode } from 'react'

import { motion } from 'framer-motion'

export interface ScaleMotionProps {
  className?: string
  children?: ReactNode
}

const ScaleMotion = ({ className, children }: ScaleMotionProps) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

export default ScaleMotion
