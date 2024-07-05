import { useEffect } from 'react'

import { DataConnection } from 'peerjs'
import { toast } from 'sonner'

import useConnection from '@/features/connect/hooks/useConnection'

const useInitializeConnection = () => {
  const { queryPeerId, isOpened, connect, isConnected, peer, connection } = useConnection()

  const registerConnectionEvents = (connection: DataConnection) => {
    connection.on('data', data => {
      console.log('Data received', data)
    })

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

  // Connect to query peer id
  useEffect(() => {
    if (queryPeerId && isOpened) {
      console.log('[useEffect] Connecting to peer', queryPeerId)
      connect(queryPeerId)
    }
  }, [queryPeerId, isOpened])

  useEffect(() => {
    return () => {
      console.log('Destroying peer')
      peer?.destroy()
    }
  }, [peer])

  return {
    isOpened,
    isConnected,
  }
}

export default useInitializeConnection
