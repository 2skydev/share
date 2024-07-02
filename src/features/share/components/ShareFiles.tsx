'use client'

import FileUpload from '@/components/FileUpload/FileUpload'

export interface ShareFilesProps {}

const ShareFiles = ({}: ShareFilesProps) => {
  return (
    <div>
      <FileUpload className="max-w-lg" allowMultiple />
    </div>
  )
}

export default ShareFiles
