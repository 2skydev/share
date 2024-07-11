'use client'

import ScaleMotion from '@/components/motion/ScaleMotion'

import useInitializeConnection from '@/features/connect/hooks/useInitializeConnection'
import ConnectScreen from '@/features/connect/screens/ConnectScreen'
import ShareAssetsScreen from '@/features/share/screens/ShareAssetsScreen'

export default function Home() {
  const { isConnected } = useInitializeConnection()

  return (
    <div className="container mt-6 sm:mt-20">
      {!isConnected && (
        <ScaleMotion>
          <ConnectScreen />
        </ScaleMotion>
      )}

      {isConnected && (
        <ScaleMotion>
          <ShareAssetsScreen />
        </ScaleMotion>
      )}
    </div>
  )
}
