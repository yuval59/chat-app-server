import { DisconnectReason, Socket } from 'socket.io'
import { SocketState } from '../socket'

type DisconnectHandlerArgs = {
  socket: Socket
  state: SocketState
}
export const disconnectHandler =
  (args: DisconnectHandlerArgs) => (reason: DisconnectReason) => {
    const { socket, state } = args
    state.removeSocket(socket.id)
    console.debug(`Disconnected ${socket.id}\n ${reason}`)
  }
