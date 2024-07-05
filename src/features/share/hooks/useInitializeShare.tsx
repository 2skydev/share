import { useEffect } from 'react'

import { DataConnection } from 'peerjs'
import { toast } from 'sonner'

import { alertDialog } from '@/components/GlobalAlertDialog/GlobalAlertDialog'

import SharedFilesViewer from '@/features/share/components/SharedFilesViewer'
import SharedTextViewer from '@/features/share/components/SharedTextViewer'
import useShare from '@/features/share/hooks/useShare'
import { downloadSharedFiles } from '@/features/share/modules/downloadSharedFiles'
import { ShareAsset, ShareAssetPrepare, ShareData } from '@/features/share/types/share.types'

const useInitializeShare = (connection?: DataConnection | null) => {
  const { shareText } = useShare()

  const handleShareAssetPrepare = (data: ShareAssetPrepare) => {
    const prepareMessages = {
      text: '공유된 텍스트를 불러오고 있어요',
      files: '공유된 파일들을 불러오고 있어요',
      clipboard: '공유된 클립보드를 불러오고 있어요',
    }

    toast.loading(prepareMessages[data.payload.type])
  }

  const handleShareAsset = (data: ShareAsset) => {
    setTimeout(() => toast.dismiss(), 1000)

    switch (data.payload.type) {
      case 'text': {
        const text = data.payload.value

        alertDialog({
          title: '공유 받은 텍스트',
          description: <SharedTextViewer className="mt-2">{text}</SharedTextViewer>,
          confirmText: '복사하기',
          onConfirm: () => {
            navigator.clipboard.writeText(text)
            toast.success('공유된 텍스트가 클립보드에 복사되었어요')
          },
        })

        break
      }

      case 'files': {
        const sharedFiles = data.payload.value.map(item => ({
          ...item,
          blob: new Blob([item.blob], { type: item.type }),
        }))

        alertDialog({
          title: '공유 받은 파일들',
          description: <SharedFilesViewer className="mt-2" sharedFiles={sharedFiles} />,
          confirmText: '위 항목들 다운로드하기',
          onConfirm: () => {
            downloadSharedFiles(sharedFiles)
            toast.success('공유된 파일들이 다운로드 되었어요')
          },
        })

        break
      }

      case 'clipboard': {
        console.log(data.payload.value)
        break
      }
    }
  }

  const handleReceiveData = (data: unknown) => {
    const shareData = data as ShareData

    switch (shareData.type) {
      case 'asset': {
        handleShareAsset(shareData)
        break
      }

      case 'prepare-asset': {
        handleShareAssetPrepare(shareData)
        break
      }
    }
  }

  const handlePaste = (e: ClipboardEvent) => {
    const text = e.clipboardData?.getData('text')

    if (!text) return

    alertDialog({
      keyboardAccessible: true,
      title: '클립보드 내용 공유하기',
      description: (
        <div>
          <p>아래 내용을 공유하시려면 Enter 또는 공유하기 버튼을 눌러주세요</p>
          <SharedTextViewer className="mt-6">{text}</SharedTextViewer>
        </div>
      ),
      confirmText: '공유하기',
      onConfirm: () => {
        shareText(text)
      },
    })
  }

  useEffect(() => {
    window.addEventListener('paste', handlePaste)

    return () => {
      window.removeEventListener('paste', handlePaste)
    }
  }, [])

  useEffect(() => {
    if (!connection) return

    connection.on('data', handleReceiveData)

    return () => {
      connection.off('data', handleReceiveData)
    }
  }, [connection])
}

export default useInitializeShare
