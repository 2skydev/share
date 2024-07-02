'use client'

import { ReactNode, useEffect, useState } from 'react'

import { motion } from 'framer-motion'
import { CheckIcon } from 'lucide-react'

import { cn } from '@/utils/tailwind.utils'

export interface SuccessIconAnimationProps {
  isSuccess?: boolean
  successIcon?: ReactNode
  className?: string
  duration?: number
  children?: ReactNode
}

const SuccessIconAnimation = ({
  isSuccess,
  successIcon,
  className,
  duration = 2000,
  children,
}: SuccessIconAnimationProps) => {
  const [show, setShow] = useState(false)

  let timeoutHandler: NodeJS.Timeout

  useEffect(() => {
    if (isSuccess) {
      clearTimeout(timeoutHandler)
      setShow(true)
      timeoutHandler = setTimeout(() => setShow(false), duration)
    }
  }, [isSuccess])

  return show ? (
    <motion.div key="success" initial={{ x: 3, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
      {successIcon ?? <CheckIcon className={cn('size-4 text-green-500', className)} />}
    </motion.div>
  ) : (
    <motion.div key="default" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {children}
    </motion.div>
  )
}

export default SuccessIconAnimation
