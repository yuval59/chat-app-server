import { asc, desc, eq, InferInsertModel, InferSelectModel } from 'drizzle-orm'
import { RETRIEVAL_LIMIT } from '../constants'
import { DBController } from './controller'
import { MessageModel } from './models'

type MessageInsertData = InferInsertModel<typeof MessageModel> & {
  createdAt: Date
}

type MessageModel = InferSelectModel<typeof MessageModel>

export class MessageDBController extends DBController {
  static getMessagesByChannelId = (
    channelId: string
  ): Promise<MessageModel[]> =>
    this.dbInstance.query.MessageTable.findMany({
      where: eq(MessageModel.channelId, channelId),
      with: { user: true },
      orderBy: asc(MessageModel.createdAt),
      limit: RETRIEVAL_LIMIT,
    })

  static createMessage = async (messageObject: MessageInsertData) =>
    await this.dbInstance.insert(MessageModel).values(messageObject)
}
