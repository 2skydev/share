'use client'

import { ReactNode } from 'react'

import { motion } from 'framer-motion'

export interface LeftInMotionProps {
  className?: string
  children?: ReactNode
}

const LeftInMotion = ({ className, children }: LeftInMotionProps) => {
  return (
    <motion.main
      className={className}
      initial={{ opacity: 0, x: 5 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      {children}
    </motion.main>
  )
}

export default LeftInMotion
