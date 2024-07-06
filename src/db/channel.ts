import { InferInsertModel, eq } from 'drizzle-orm'
import { DBController } from './controller'
import { ChannelModel } from './models'

type ChannelInsertData = InferInsertModel<typeof ChannelModel>

export class ChannelDBController extends DBController {
  static getChannels = () => this.dbInstance.select().from(ChannelModel)

  static getChannelByName = (name: string) =>
    this.dbInstance.query.ChannelTable.findFirst({
      where: eq(ChannelModel.name, name),
    })

  static getChannelById = (id: string) =>
    this.dbInstance.query.ChannelTable.findFirst({
      where: eq(ChannelModel.id, id),
    })

  static createChannel = async (values: ChannelInsertData) =>
    this.dbInstance.insert(ChannelModel).values(values)
}
