'use client'

import { Separator } from '@/components/ui/separator'

import useConnection from '@/features/connect/hooks/useConnection'
import DragOverlay from '@/features/share/components/DragOverlay'
import ShareClipboard from '@/features/share/components/ShareClipboard'
import ShareFiles from '@/features/share/components/ShareFiles'
import ShareText from '@/features/share/components/ShareText'
import useInitializeShare from '@/features/share/hooks/useInitializeShare'

export interface ShareAssetsScreenProps {}

const ShareAssetsScreen = ({}: ShareAssetsScreenProps) => {
  const { connection } = useConnection()

  useInitializeShare(connection)

  return (
    <section className="space-y-8">
      <DragOverlay />

      <div>
        <h1 className="font-bold text-2xl">공유하기 - {connection?.connectionId}</h1>
        <p className="text-muted-foreground mb-8">
          상대방과 파일이나 텍스트, 클립보드 내용을 공유해보세요
        </p>
      </div>

      <ShareFiles />

      <Separator className="max-w-10" />

      <ShareText />

      <Separator className="max-w-10" />

      <ShareClipboard />
    </section>
  )
}

export default ShareAssetsScreen
