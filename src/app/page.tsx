'use client'

import ThemeToggleButton from '@/components/ThemeToggleButton'
import ScaleMotion from '@/components/motion/ScaleMotion'

import useConnection from '@/features/connect/hooks/useConnection'
import ConnectScreen from '@/features/connect/screens/ConnectScreen'
import ShareAssetsScreen from '@/features/share/screens/ShareAssetsScreen'

export default function Home() {
  const { isConnected } = useConnection()

  return (
    <>
      <header className="h-16 flex items-center justify-between px-10">
        <img src="/favicon.ico" alt="logo" className="h-6" />

        <ThemeToggleButton />
      </header>

      <main>
        <div className="container mt-20 space-y-20">
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
      </main>
    </>
  )
}
