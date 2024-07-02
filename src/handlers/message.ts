import { Server, Socket } from 'socket.io'
import { v4 } from 'uuid'
import { z } from 'zod'
import { ERRORS, SOCKET_EVENTS } from '../constants'
import { MessageController } from '../db'
import { SocketState } from '../socket'

const newMessageEventShape = (socketId: string, state: SocketState) =>
  z
    .object({
      jwt: z.string(),
      message: z.string(),
    })
    .refine(({ jwt }) => state.validateJwt(socketId, jwt), ERRORS.JWT_MISMATCH)

type NewMessageArgs = {
  server: Server
  socket: Socket
  state: SocketState
}
export const newMessageHandler =
  (args: NewMessageArgs) => async (event: unknown) => {
    const { server, socket, state } = args,
      socketId = socket.id,
      channelId = state.getRoom(socketId),
      parsed = newMessageEventShape(socketId, state).safeParse(event)

    if (!parsed.success) return

    const { message } = parsed.data,
      { id: userId, color, username } = state.getPayload(socketId)

    const messageTimestamp = await MessageController.insertMessage({
      id: v4(),
      message,
      channelId,
      userId,
    })

    server.to(channelId).emit(SOCKET_EVENTS.NEW_MESSAGE, {
      userId,
      username,
      color,
      message,
      timeStamp: messageTimestamp,
    })
  }

type MessageHistoryArgs = { socket: Socket; state: SocketState }
export const messageHistoryHandler = (args: MessageHistoryArgs) => async () => {
  const { state, socket } = args,
    messages = await MessageController.getMessagesByChannelId(
      state.getRoom(socket.id)
    )

  socket.emit(SOCKET_EVENTS.MESSAGE_HISTORY, { messages })
}
