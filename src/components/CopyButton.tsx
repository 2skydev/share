import { ComponentProps, useState } from 'react'

import { motion } from 'framer-motion'
import { CheckIcon, CopyIcon } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'

import { theme } from '@/styles/theme'

export interface CopyButtonProps extends ComponentProps<typeof Button> {
  value: string
  iconSize?: string
}

let timeoutHandle: NodeJS.Timeout

export const copyText = (value: string, message?: string) => {
  navigator.clipboard.writeText(value)
  toast.success(message ?? '복사되었어요')
}

const CheckIconWithMotion = motion(CheckIcon)
const CopyIconWithMotion = motion(CopyIcon)

const CopyButton = ({ value, children, size, iconSize, ...props }: CopyButtonProps) => {
  const [showSuccessIcon, setShowSuccessIcon] = useState(false)

  const handleCopy = () => {
    clearTimeout(timeoutHandle)
    navigator.clipboard.writeText(value)
    setShowSuccessIcon(true)
    timeoutHandle = setTimeout(() => setShowSuccessIcon(false), 2000)
  }

  return (
    <Button
      variant="ghost"
      size={size || 'icon'}
      className="size-8"
      onClick={handleCopy}
      {...props}
    >
      {showSuccessIcon ? (
        <CheckIconWithMotion
          initial={{ x: 3, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          size={iconSize || '1rem'}
          color={theme.colors.green['500']}
        />
      ) : (
        <CopyIconWithMotion
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          size={iconSize || '1rem'}
        />
      )}
      {children}
    </Button>
  )
}

export default CopyButton
