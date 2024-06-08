import { eq } from 'drizzle-orm'
import { RETRIEVAL_LIMIT } from '../constants'
import { Controller } from './controller'
import { MessageTable } from './schemas'

export class MessageController extends Controller {
  static getMessages = (channelId: string) =>
    this.dbInstance
      .select()
      .from(MessageTable)
      .where(eq(MessageTable.channelId, channelId))
      .limit(RETRIEVAL_LIMIT)
}
