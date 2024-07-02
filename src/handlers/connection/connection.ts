import { Server, Socket } from 'socket.io'
import { z } from 'zod'
import { verifyJwtOrSign } from '.'
import { SOCKET_EVENTS } from '../../constants'
import { ChannelController } from '../../db'
import {
  channelUpdateHandler,
  disconnectHandler,
  getChannelsHandler,
  messageHistoryHandler,
  newMessageHandler,
  userUpdateHandler,
} from '../../handlers'
import { SocketState } from '../../socket'

const socketConnectionShape = z.object({
  jwt: z.string(),
})

type ConnectionArgs = { server: Server; state: SocketState }
export const connectionHandler =
  (args: ConnectionArgs) => async (socket: Socket) => {
    const { server, state } = args,
      parsed = socketConnectionShape.safeParse(socket.handshake.query)
    if (!parsed.success) return socket.disconnect()

    const channels = await ChannelController.getChannels()
    socket.emit(SOCKET_EVENTS.GET_CHANNELS)
    socket.join(channels[0].id) // Temporary - will add a settable default channel.

    // Worth noting - this labored function exists for a good reason.
    // It exists so in the future we know whenever a user sends us their jwt the user exists in the database, since this is the only way to create a new user or receive a valid signed JWT.
    // Another (intended) side-effect of this function + the SocketState class is that we only need to verify the JWT on socket connection.
    // For anything else (like chatting) we can just compare the state's JWT with the provided one.
    verifyJwtOrSign({
      socket,
      state,
      jwt: parsed.data.jwt,
      channelId: channels[0].id,
    })

    listenToEvents({ server, state, socket })

    console.debug(`Connected ${socket.id}`)
  }

type ListenArgs = {
  server: Server
  state: SocketState
  socket: Socket
}
const listenToEvents = (args: ListenArgs) => {
  const { server, state, socket } = args

  socket.on(SOCKET_EVENTS.DISCONNECTION, disconnectHandler({ state, socket }))

  socket.on(SOCKET_EVENTS.GET_CHANNELS, getChannelsHandler({ socket }))
  socket.on(SOCKET_EVENTS.UPDATE_CHANNEL, channelUpdateHandler)

  socket.on(SOCKET_EVENTS.UPDATE_USER, userUpdateHandler({ state, socket }))

  socket.on(
    SOCKET_EVENTS.MESSAGE_HISTORY,
    messageHistoryHandler({ state, socket })
  )
  socket.on(
    SOCKET_EVENTS.NEW_MESSAGE,
    newMessageHandler({ server, state, socket })
  )
}
