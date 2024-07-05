import { getBaseUrl } from '@/features/connect/modules/getBaseUrl'
import { connectionStore } from '@/features/connect/stores/connection.store'

import { useStore } from '@/hooks/useStore'

const useConnection = () => {
  const connection = useStore(connectionStore)

  const baseUrl = getBaseUrl()
  const connectUrl = connection.peerId ? `${baseUrl}/peer-id/${connection.peerId}` : null

  return { ...connection, connectUrl }
}

export default useConnection
