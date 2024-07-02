'use client'

import ConnectCustom from '@/features/connect/components/ConnectCustom'
import ConnectLink from '@/features/connect/components/ConnectLink'
import ConnectQRCode from '@/features/connect/components/ConnectQRCode'

export interface ConnectMethodsProps {}

const ConnectMethods = ({}: ConnectMethodsProps) => {
  return (
    <div className="flex items-center gap-4">
      <ConnectQRCode />

      <span>/</span>

      <ConnectLink />

      <span>/</span>

      <ConnectCustom />
    </div>
  )
}

export default ConnectMethods
