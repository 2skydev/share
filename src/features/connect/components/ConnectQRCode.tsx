'use client'

import { QRCode } from 'react-qrcode-logo'

import { Skeleton } from '@/components/ui/skeleton'

import useConnection from '@/features/connect/hooks/useConnection'

export interface ConnectQRCodeProps {}

const ConnectQRCode = ({}: ConnectQRCodeProps) => {
  const { connectUrl } = useConnection()

  return connectUrl ? (
    <QRCode
      value={connectUrl}
      qrStyle="dots"
      logoImage="/favicon.ico"
      logoPadding={2}
      logoPaddingStyle="circle"
    />
  ) : (
    <Skeleton className="w-[170px] h-[170px]" />
  )
}

export default ConnectQRCode
