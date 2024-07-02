'use client'

import { toast } from 'sonner'

import CopyButton from '@/components/CopyButton'

import useConnection from '@/features/connect/hooks/useConnection'

export interface ConnectLinkProps {}

const ConnectLink = ({}: ConnectLinkProps) => {
  const { peerId } = useConnection()

  return (
    <CopyButton
      variant="default"
      size="default"
      className="gap-2"
      value={`http://localhost:3001?id=${peerId}`}
      onCopy={() => toast.success('연결 코드가 포함된 링크가 복사되었어요')}
      disabled={!peerId}
    >
      링크로 연결하기
    </CopyButton>
  )
}

export default ConnectLink
