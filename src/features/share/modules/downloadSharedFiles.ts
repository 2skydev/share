import { BlobWithFileMetadata } from '@/features/share/types/share.types'

export const downloadSharedFiles = (sharedFiles: BlobWithFileMetadata[]) => {
  for (const sharedFile of sharedFiles) {
    const url = URL.createObjectURL(sharedFile.blob)
    const a = document.createElement('a')

    a.href = url
    a.download = sharedFile.name
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }
}
