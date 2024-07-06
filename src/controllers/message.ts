import { v4 } from 'uuid'
import { z } from 'zod'
import { MessageDBController } from '../db/message'
import { messageCreationBody } from '../shapes'

type MessageCreationParams = z.infer<typeof messageCreationBody>

export const getMessages = async (channelId: string) => ({
  messages: await MessageDBController.getMessagesByChannelId(channelId),
})

export const createMessage = async (params: MessageCreationParams) => {
  const message = { ...params, id: v4(), createdAt: new Date() }

  await MessageDBController.createMessage(message)
}
