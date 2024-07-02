import { desc, eq, InferInsertModel, InferSelectModel } from 'drizzle-orm'
import { RETRIEVAL_LIMIT } from '../constants'
import { Controller } from './controller'
import { MessageModel } from './models'

type MessageInsertData = InferInsertModel<typeof MessageModel>

type MessageModel = InferSelectModel<typeof MessageModel>

export class MessageController extends Controller {
  static getMessagesByChannelId = (
    channelId: string
  ): Promise<MessageModel[]> =>
    this.dbInstance.query.MessageTable.findMany({
      where: eq(MessageModel.channelId, channelId),
      with: { user: true },
      orderBy: desc(MessageModel.createdAt),
      limit: RETRIEVAL_LIMIT,
    })

  static insertMessage = async (messageObject: MessageInsertData) => {
    const timeStamp = new Date()
    await this.dbInstance
      .insert(MessageModel)
      .values({ ...messageObject, createdAt: timeStamp })

    return timeStamp
  }
}
