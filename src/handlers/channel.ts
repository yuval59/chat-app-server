import { SOCKET_EVENTS } from '@/constants'
import { ChannelController } from '@/db'
import { Socket } from 'socket.io'
import { z } from 'zod'

const channelUpdateEvent = z.string()

export const channelUpdateHandler =
  (socket: Socket) => async (event: unknown) => {
    const parsed = channelUpdateEvent.safeParse(event)
    if (!parsed.success) return

    for (const roomName in socket.rooms) socket.leave(roomName)

    socket.join(parsed.data)
  }

export const getChannelsHandler = (socket: Socket) => async () => {
  socket.emit(SOCKET_EVENTS.GET_CHANNELS, await ChannelController.getChannels())
}
