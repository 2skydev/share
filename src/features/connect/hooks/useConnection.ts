import { useEffect } from 'react'

import { useSearchParams } from 'next/navigation'

import { connectionStore } from '@/features/connect/stores/connection.store'

import { useStore } from '@/hooks/useStore'

const useConnection = () => {
  const searchParams = useSearchParams()
  const queryPeerId = searchParams.get('id')

  const connection = useStore(connectionStore)

  const isReceiver = !!queryPeerId

  useEffect(() => {
    if (queryPeerId && connection.isOpened) {
      connection.connect(queryPeerId)
    }
  }, [queryPeerId, connection.isOpened])

  return { ...connection, isReceiver }
}

export default useConnection
