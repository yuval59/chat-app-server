import { v4 } from 'uuid'
import { ChannelDBController } from '../db/channel'

export const createChannel = async (channelName: string) =>
  await ChannelDBController.createChannel({
    name: channelName,
    id: v4(),
    isDefault: false,
  })

export const getChannels = async () => ({
  channels: await ChannelDBController.getChannels(),
})
