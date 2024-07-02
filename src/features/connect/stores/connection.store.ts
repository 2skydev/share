import { Exome } from 'exome'
import Peer, { DataConnection } from 'peerjs'
import { toast } from 'sonner'

export class ConnectionStore extends Exome {
  peer: Peer
  peerId: string | null = null
  connection: DataConnection | null = null
  isOpened = false
  isConnected = false

  constructor() {
    super()

    this.peer = new Peer()

    this.peer.on('open', this.handleOpen)
    this.peer.on('connection', this.handleConnection)
    this.peer
  }

  connect(targetPeerId: string) {
    this.registerConnection(this.peer.connect(targetPeerId, { reliable: true }))
  }

  private registerConnection(connection: DataConnection) {
    this.connection = connection
    this.connection.on('open', this.handleConnectionOpen)
    this.connection.on('close', this.handleConnectionClose)
  }

  private handleOpen(id: string) {
    this.peerId = id
    this.isOpened = true
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
    toast.error('상대방과 연결이 종료되었어요.')
  }
}

export const connectionStore = new ConnectionStore()
