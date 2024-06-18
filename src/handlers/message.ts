import { ERRORS, SOCKET_EVENTS } from '@/constants'
import { MessageController } from '@/db'
import { SocketState } from '@/socket'
import { Server } from 'socket.io'
import { v4 } from 'uuid'
import { z } from 'zod'

const messageEventShape = (socketId: string, state: SocketState) =>
  z
    .object({
      jwt: z.string(),
      message: z.string(),
      channelId: z.string(),
    })
    .refine(({ jwt }) => state.validateJwt(socketId, jwt), ERRORS.JWT_MISMATCH)

export const messageHandler =
  (server: Server, socketId: string, state: SocketState) =>
  async (event: unknown) => {
    const parsed = messageEventShape(socketId, state).safeParse(event)
    if (!parsed.success) return

    const { channelId, message } = parsed.data
    const { id: userId, color, username } = state.getPayload(socketId)

    const chatMessage = {
      userId,
      username,
      color,
      message,
    }

    await MessageController.insertMessage({
      id: v4(),
      message,
      channelId,
      userId,
    })

    server.to(channelId).emit(SOCKET_EVENTS.MESSAGE, chatMessage)
  }
