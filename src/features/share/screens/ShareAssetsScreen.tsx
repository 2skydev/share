'use client'

import useConnection from '@/features/connect/hooks/useConnection'
import ShareFiles from '@/features/share/components/ShareFiles'
import ShareText from '@/features/share/components/ShareText'

export interface ShareAssetsScreenProps {}

const ShareAssetsScreen = ({}: ShareAssetsScreenProps) => {
  const { connection } = useConnection()

  return (
    <section className="space-y-8">
      <div>
        <h1 className="font-bold text-2xl">Assets by - {connection?.connectionId}</h1>
        <p className="text-muted-foreground mb-8">
          Choose the method you want to connect with who you want to share with
        </p>
      </div>

      <ShareText />
      <ShareFiles />
    </section>
  )
}

export default ShareAssetsScreen
