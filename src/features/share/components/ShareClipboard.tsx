'use client'

import { ClipboardIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'

import useShare from '@/features/share/hooks/useShare'

export interface ShareClipboardProps {}

const ShareClipboard = ({}: ShareClipboardProps) => {
  const { shareClipboard } = useShare()

  return (
    <div>
      <Button size="sm" onClick={shareClipboard}>
        <ClipboardIcon className="size-4 mr-2" /> 클립보드 내용 공유하기
      </Button>

      <ul className="list-disc ml-4 mt-2">
        <li className="text-sm text-muted-foreground ">
          PC인 경우 Ctrl + V로 바로 공유가 가능합니다
        </li>
      </ul>
    </div>
  )
}

export default ShareClipboard
