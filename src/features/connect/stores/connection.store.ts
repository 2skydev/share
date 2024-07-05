import { Exome } from 'exome'
import { nanoid } from 'nanoid'
import Peer, { DataConnection, PeerError, PeerErrorType } from 'peerjs'

import { isServer } from '@/utils/env.utils'

export class ConnectionStore extends Exome {
  peer?: Peer
  peerId: string | null = null
  connection: DataConnection | null = null
  isOpened = false
  isConnected = false
  private recentConnectPeerId: string | null = null
  private retryTimeout: NodeJS.Timeout | null = null

  constructor() {
    super()

    if (isServer()) return this

    let initPeerId = localStorage.getItem('peerId')

    if (!initPeerId) localStorage['peerId'] = initPeerId = nanoid()

    this.peer = new Peer(initPeerId)
    this.peer.on('open', this.handleOpen)
    this.peer.on('error', this.handleError)
    this.peer.on('connection', this.handleConnection)
  }

  connect(targetPeerId: string) {
    if (this.retryTimeout) clearTimeout(this.retryTimeout)
    if (!this.peer || this.peer.destroyed) return

    this.recentConnectPeerId = targetPeerId
    this.registerConnection(this.peer.connect(targetPeerId, { reliable: true }))
  }

  private retryConnectByRecentConnectPeerId = () => {
    if (this.recentConnectPeerId) {
      this.retryTimeout = setTimeout(() => {
        this.connect(this.recentConnectPeerId!)
      }, 3000)
    }
  }

  private registerConnection(connection?: DataConnection) {
    if (!connection) return
    if (this.retryTimeout) clearTimeout(this.retryTimeout)

    this.connection = connection
    this.connection.on('open', this.handleConnectionOpen)
    this.connection.on('close', this.handleConnectionClose)
  }

  private handleOpen(id: string) {
    this.peerId = id
    this.isOpened = true
  }

  private handleError(error: unknown) {
    console.log(error)
    if (error instanceof PeerError) {
      switch (error.type) {
        case PeerErrorType.PeerUnavailable: {
          this.retryConnectByRecentConnectPeerId()

          break
        }
      }
    }
  }

  private handleConnection(connection: DataConnection) {
    this.registerConnection(connection)
  }

  private handleConnectionOpen() {
    this.isConnected = true
  }

  private handleConnectionClose() {
    this.isConnected = false
    this.connection = null
    this.retryConnectByRecentConnectPeerId()
  }
}

export const connectionStore = new ConnectionStore()
