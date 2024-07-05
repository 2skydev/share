'use client'

import ConnectMethods from '@/features/connect/components/ConnectMethods'
import ConnectVisual from '@/features/connect/components/ConnectVisual'
import useConnection from '@/features/connect/hooks/useConnection'

export interface ConnectScreenProps {
  isReceiver?: boolean
}

const ConnectScreen = ({ isReceiver }: ConnectScreenProps) => {
  const { isConnected } = useConnection()

  return (
    <section className="space-y-8">
      <div>
        <h1 className="font-bold text-2xl">연결하기</h1>
        <p className="text-muted-foreground mb-8">
          공유하고 싶은 사람과 연결하고 싶은 방법을 선택하세요
        </p>
      </div>

      <ConnectVisual />

      {!isReceiver && !isConnected && <ConnectMethods />}

      {isReceiver && !isConnected && <p>상대방과 연결 시도 중...</p>}
    </section>
  )
}

export default ConnectScreen
