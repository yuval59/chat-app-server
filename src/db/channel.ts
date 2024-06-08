import { eq } from 'drizzle-orm'
import { v4 } from 'uuid'
import { Controller } from './controller'
import { ChannelTable } from './schemas'

export class ChannelController extends Controller {
  static getChannels = () => this.dbInstance.select().from(ChannelTable)

  static getChannelByName = (name: string) =>
    this.dbInstance.query.ChannelTable.findFirst({
      where: eq(ChannelTable.name, name),
    })

  static getChannelById = (id: string) =>
    this.dbInstance.query.ChannelTable.findFirst({
      where: eq(ChannelTable.id, id),
    })

  static makeChannel = async (name: string) => {
    const existing = await this.dbInstance.query.ChannelTable.findFirst({
      where: eq(ChannelTable.name, name),
    })

    if (existing) return existing

    const values = { id: v4(), name }

    await this.dbInstance.insert(ChannelTable).values(values)

    return values
  }
}
