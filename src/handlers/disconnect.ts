import { SocketState } from '@/socket'
import { DisconnectReason } from 'socket.io'

export const disconnectHandler =
  (id: string, state: SocketState) => (reason: DisconnectReason) => {
    state.removeSocket(id)
    console.debug(`Disconnected ${id}\n ${reason}`)
  }
