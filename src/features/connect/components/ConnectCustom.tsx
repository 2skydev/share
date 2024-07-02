'use client'

import { Button } from '@/components/ui/button'

import useConnection from '@/features/connect/hooks/useConnection'

export interface ConnectCustomProps {}

const ConnectCustom = ({}: ConnectCustomProps) => {
  const { peerId } = useConnection()

  return <Button disabled={!peerId}>직접 연결 코드 생성하기</Button>
}

export default ConnectCustom
