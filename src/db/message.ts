import { RETRIEVAL_LIMIT } from '@/constants'
import { asc, eq, InferInsertModel, InferSelectModel } from 'drizzle-orm'
import { Controller } from './controller'
import { MessageTable } from './schemas'

type MessageInsertData = InferInsertModel<typeof MessageTable>

type MessageModel = InferSelectModel<typeof MessageTable>

export class MessageController extends Controller {
  static getMessagesByChannelId = (
    channelId: string
  ): Promise<MessageModel[]> =>
    this.dbInstance.query.MessageTable.findMany({
      where: eq(MessageTable.channelId, channelId),
      orderBy: asc(MessageTable.createdAt),
      limit: RETRIEVAL_LIMIT,
    })

  static insertMessage = async (messageObject: MessageInsertData) =>
    this.dbInstance.insert(MessageTable).values(messageObject)
}
