import { useSearchParams } from 'next/navigation'

import { getBaseUrl } from '@/features/connect/modules/getBaseUrl'
import { connectionStore } from '@/features/connect/stores/connection.store'

import { useStore } from '@/hooks/useStore'

const useConnection = () => {
  const searchParams = useSearchParams()
  const queryPeerId = searchParams.get('id')

  const connection = useStore(connectionStore)

  const isReceiver = !!queryPeerId

  const baseUrl = getBaseUrl()
  const connectUrl = connection.peerId ? `${baseUrl}?id=${connection.peerId}` : null

  return { ...connection, isReceiver, connectUrl, queryPeerId }
}

export default useConnection
