'use client'

import { useParams } from 'next/navigation'

import ScaleMotion from '@/components/motion/ScaleMotion'

import useInitializeConnection from '@/features/connect/hooks/useInitializeConnection'
import ConnectScreen from '@/features/connect/screens/ConnectScreen'
import ShareAssetsScreen from '@/features/share/screens/ShareAssetsScreen'

export default function ConnectByPeerIdPage() {
  const { peerId } = useParams<{ peerId: string }>()

  const { isConnected } = useInitializeConnection(peerId)

  return (
    <>
      <div className="container mt-2 sm:mt-20 pb-10">
        {!isConnected && (
          <ScaleMotion>
            <ConnectScreen isReceiver />
          </ScaleMotion>
        )}

        {isConnected && (
          <ScaleMotion>
            <ShareAssetsScreen />
          </ScaleMotion>
        )}
      </div>
    </>
  )
}
