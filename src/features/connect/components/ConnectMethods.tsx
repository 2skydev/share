'use client'

// import ConnectCustom from '@/features/connect/components/ConnectCustom'
import ConnectLink from '@/features/connect/components/ConnectLink'
import ConnectQRCode from '@/features/connect/components/ConnectQRCode'

export interface ConnectMethodsProps {}

const ConnectMethods = ({}: ConnectMethodsProps) => {
  return (
    <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
      <ConnectQRCode />

      <span className="hidden sm:block">/</span>

      <ConnectLink />

      {/* <span>/</span>

      <ConnectCustom /> */}
    </div>
  )
}

export default ConnectMethods
