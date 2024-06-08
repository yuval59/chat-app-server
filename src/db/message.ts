import { RETRIEVAL_LIMIT } from '@/constants'
import { eq, type InferSelectModel } from 'drizzle-orm'
import { v4 } from 'uuid'
import { Controller } from './controller'
import { MessageTable } from './schemas'

type MessageInsertData = {
  channelId: string
  message: string
  username: string
}

type MessageModel = InferSelectModel<typeof MessageTable>

export class MessageController extends Controller {
  static getMessagesByChannelId = (
    channelId: string
  ): Promise<MessageModel[]> =>
    this.dbInstance.query.MessageTable.findMany({
      where: eq(MessageTable.channelId, channelId),
      limit: RETRIEVAL_LIMIT,
    })

  static insertMessages = async (
    ...messageObjects: MessageInsertData[]
  ): Promise<unknown[]> =>
    // Just kill me tbh
    // This is supposed to return a MessageModel, but it won't.
    // Switching to Postgres?
    messageObjects.map(({ channelId, message, username }) =>
      this.dbInstance.insert(MessageTable).values({
        channelId,
        message,
        username,
        id: v4(),
      })
    )
}
