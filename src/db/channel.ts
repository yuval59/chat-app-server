import { eq } from 'drizzle-orm'
import { v4 } from 'uuid'
import { Controller } from './controller'
import { ChannelModel } from './models'

export class ChannelController extends Controller {
  static getChannels = () => this.dbInstance.select().from(ChannelModel)

  static getChannelByName = (name: string) =>
    this.dbInstance.query.ChannelTable.findFirst({
      where: eq(ChannelModel.name, name),
    })

  static getChannelById = (id: string) =>
    this.dbInstance.query.ChannelTable.findFirst({
      where: eq(ChannelModel.id, id),
    })

  static makeChannel = async (name: string) => {
    const existing = await this.dbInstance.query.ChannelTable.findFirst({
      where: eq(ChannelModel.name, name),
    })

    if (existing) return existing

    const values = { id: v4(), name }

    await this.dbInstance.insert(ChannelModel).values(values)

    return values
  }
}
