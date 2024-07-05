'use client'

import FileUpload from '@/components/FileUpload/FileUpload'

import { BlobWithFileMetadata } from '@/features/share/types/share.types'

import { cn } from '@/utils/tailwind.utils'

export interface SharedFilesViewerProps {
  className?: string
  sharedFiles: (BlobWithFileMetadata | File)[]
}

const SharedFilesViewer = ({ className, sharedFiles }: SharedFilesViewerProps) => {
  return (
    <div className={cn('', className)}>
      <FileUpload
        className="readonly"
        // @ts-ignore
        files={sharedFiles.map(item => ({
          source: 'blob' in item ? item.blob : item,
          options: {
            type: 'input',
            file: {
              name: item.name,
              type: item.type,
              size: item.size,
            },
          },
        }))}
        allowImagePreview={true}
        // allowBrowse={false}
        // allowDrop={false}
        // allowPaste={false}
        labelIdle=""
        credits={false}
        allowMultiple
      />
    </div>
  )
}

export default SharedFilesViewer
