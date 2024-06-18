import { SOCKET_EVENTS } from '@/constants'
import { ChannelController } from '@/db'
import { SocketState } from '@/socket'
import { Server, Socket } from 'socket.io'
import { z } from 'zod'
import { verifyJwtOrSign } from '.'
import {
  channelUpdateHandler,
  disconnectHandler,
  getChannelsHandler,
  messageHandler,
  userUpdateHandler,
} from '..'

const socketConnectionShape = z.object({
  jwt: z.string(),
})

export const connectionHandler =
  (server: Server, state: SocketState) => async (socket: Socket) => {
    const parsed = socketConnectionShape.safeParse(socket.handshake.query)
    if (!parsed.success) return socket.disconnect()

    // Worth noting - this labored function exists for a good reason.
    // It exists so in the future we know whenever a user sends us their jwt the user exists in the database, since this is the only way to create a new user or receive a valid signed JWT.
    // Another (intended) side-effect of this function + the SocketState class is that we only need to verify the JWT on socket connection.
    // For anything else (like chatting) we can just compare the state's JWT with the provided one.
    verifyJwtOrSign(socket, state, parsed.data.jwt)

    const channels = await ChannelController.getChannels()
    socket.emit(SOCKET_EVENTS.GET_CHANNELS)
    socket.join(channels[0].id) // Temporary - will add a settable default channel.

    socket.on(SOCKET_EVENTS.GET_CHANNELS, getChannelsHandler(socket))
    socket.on(SOCKET_EVENTS.MESSAGE, messageHandler(server, socket.id, state))
    socket.on(SOCKET_EVENTS.UPDATE_CHANNEL, channelUpdateHandler)
    socket.on(SOCKET_EVENTS.DISCONNECTION, disconnectHandler(socket.id, state))
    socket.on(SOCKET_EVENTS.UPDATE_USER, userUpdateHandler(socket, state))

    console.debug(`Connected ${socket.id}`)
  }
