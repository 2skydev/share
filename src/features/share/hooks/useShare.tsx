import { toast } from 'sonner'

import { alertDialog } from '@/components/GlobalAlertDialog/GlobalAlertDialog'

import useConnection from '@/features/connect/hooks/useConnection'
import SharedFilesViewer from '@/features/share/components/SharedFilesViewer'
import SharedTextViewer from '@/features/share/components/SharedTextViewer'
import { BlobWithFileMetadata, ShareData } from '@/features/share/types/share.types'

const useShare = () => {
  const { connection } = useConnection()

  const send = async (data: ShareData) => {
    if (!connection) return toast.error('공유할 대상과 연결이 되어있지 않습니다')

    await connection.send(data)
  }

  const prepare = async (type: 'text' | 'files' | 'clipboard') => {
    await send({
      type: 'prepare-asset',
      payload: {
        type,
      },
    })
  }

  const transformBlobWithFileMetadata = (files: File[]): BlobWithFileMetadata[] => {
    return files.map(file => {
      return {
        blob: new Blob([file], { type: file.type }),
        size: file.size,
        name: file.name,
        type: file.type,
      }
    })
  }

  const shareText = async (value: string) => {
    prepare('text')

    await send({
      type: 'asset',
      payload: {
        type: 'text',
        value,
      },
    })
  }

  const shareFiles = async (files: File[]) => {
    if (files.length === 0) return toast.error('공유할 파일이 없습니다')

    const value = transformBlobWithFileMetadata(files)

    prepare('files')

    await send({
      type: 'asset',
      payload: {
        type: 'files',
        value,
      },
    })
  }

  const shareClipboard = async () => {
    if (!navigator.clipboard) {
      return toast.error('해당 브라우저에서는 클립보드 API를 사용할 수 없습니다')
    }

    const items = await navigator.clipboard.read()
    const item = items[0]

    if (!item || !item.types.length) {
      return toast.error('클립보드에 복사된 내용이 없습니다')
    }

    const isText = item.types.every(type => type.includes('text/'))

    if (isText) {
      const hasPlainText = item.types.includes('text/plain')

      const blob = await item.getType(hasPlainText ? 'text/plain' : item.types[0])
      const text = await blob.text()

      alertDialog({
        keyboardAccessible: true,
        title: '텍스트 공유하기',
        description: (
          <div>
            <p>아래 텍스트를 공유하시려면 Enter 또는 공유하기 버튼을 눌러주세요</p>
            <SharedTextViewer className="mt-6">{text}</SharedTextViewer>
          </div>
        ),
        confirmText: '텍스트 공유하기',
        onConfirm: () => {
          shareText(text)
        },
      })
    } else {
      const type = item.types.find(type => !type.includes('text/'))!

      const blob = await item.getType(type)

      const files = [
        new File([blob], `share-file-${Date.now()}.${type.split('/').pop()}`, { type }),
      ]

      alertDialog({
        keyboardAccessible: true,
        title: '파일 공유하기',
        description: (
          <div>
            <p>아래 파일을 공유하시려면 Enter 또는 공유하기 버튼을 눌러주세요</p>
            <SharedFilesViewer sharedFiles={files} className="mt-6" />
          </div>
        ),
        confirmText: '파일 공유하기',
        onConfirm: () => {
          shareFiles(files)
        },
      })
    }
  }

  return {
    shareText,
    shareFiles,
    shareClipboard,
  }
}

export default useShare
