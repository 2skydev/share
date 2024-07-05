'use client'

import { useState } from 'react'

import { FilePondFile } from 'filepond'
import { FileUpIcon } from 'lucide-react'

import AsyncButton from '@/components/AsyncButton'
import FileUpload from '@/components/FileUpload/FileUpload'

import useShare from '@/features/share/hooks/useShare'

export interface ShareFilesProps {}

const ShareFiles = ({}: ShareFilesProps) => {
  const { shareFiles } = useShare()

  // @ts-ignore: FilePondFile[] is not assignable to FilePondInitialFile[]
  const [files, setFiles] = useState<FilePondFile[]>([])

  const handleSubmit = async () => {
    await shareFiles(files.map(file => file.file) as File[])
    setFiles([])
  }

  return (
    <div>
      <FileUpload
        className="max-w-md"
        // @ts-ignore: FilePondFile[] is not assignable to FilePondInitialFile[]
        files={files}
        onupdatefiles={setFiles}
        credits={false}
        labelIdle="파일을 여기에 끌어다 놓거나 <span class='filepond--label-action'>찾아보기</span>"
        dropOnElement={false}
        dropOnPage
        allowMultiple
      />

      <AsyncButton size="sm" onClick={handleSubmit} shouldLoadingIconShow>
        <FileUpIcon className="size-4 mr-2" /> 파일 전송
      </AsyncButton>
    </div>
  )
}

export default ShareFiles
