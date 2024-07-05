import { useEffect } from 'react'

import { DataConnection } from 'peerjs'
import { toast } from 'sonner'

import useConnection from '@/features/connect/hooks/useConnection'

const useInitializeConnection = (connectPeerId?: string) => {
  const { isOpened, connect, isConnected, peer, connection } = useConnection()

  const registerConnectionEvents = (connection: DataConnection) => {
    connection.on('close', () => {
      toast.error('상대방과 연결이 종료되었어요.')
    })

    connection.on('error', error => {
      console.error(error)
      toast.error('오류가 발생했어요.')
    })
  }

  useEffect(() => {
    if (connection) {
      registerConnectionEvents(connection)
    }
  }, [connection])

  // Connect to connectPeerId
  useEffect(() => {
    if (connectPeerId && isOpened) {
      connect(connectPeerId)
    }
  }, [connectPeerId, isOpened])

  useEffect(() => {
    return () => {
      peer?.destroy()
    }
  }, [peer])

  return {
    isOpened,
    isConnected,
  }
}

export default useInitializeConnection
