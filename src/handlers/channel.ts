import { Socket } from 'socket.io'
import { z } from 'zod'
import { SOCKET_EVENTS } from '../constants'
import { ChannelController } from '../db'

const channelUpdateEvent = z.string()

type ChannelArgs = { socket: Socket }

export const channelUpdateHandler =
  (args: ChannelArgs) => async (event: unknown) => {
    const { socket } = args,
      parsed = channelUpdateEvent.safeParse(event)
    if (!parsed.success) return

    for (const roomName in socket.rooms) socket.leave(roomName)

    socket.join(parsed.data)
  }

export const getChannelsHandler = (args: ChannelArgs) => async () =>
  args.socket.emit(
    SOCKET_EVENTS.GET_CHANNELS,
    await ChannelController.getChannels()
  )
