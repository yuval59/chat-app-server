import { eq } from 'drizzle-orm'
import { uuid } from 'uuidv4'
import { Controller } from './controller'
import { ChannelTable } from './schemas'

export class ChannelController extends Controller {
  static getChannels = () => this.dbInstance.select().from(ChannelTable)

  static getChannelByName = (name: string) =>
    this.dbInstance
      .select()
      .from(ChannelTable)
      .where(eq(ChannelTable.name, name))

  static getChannelOrCreate = (name: string) =>
    this.dbInstance
      .select()
      .from(ChannelTable)
      .where(eq(ChannelTable.name, name)) ??
    this.dbInstance.insert(ChannelTable).values({ id: uuid(), name })

  static makeChannel = (name: string) => {
    this.dbInstance.insert(ChannelTable).values({
      id: uuid(),
      name,
    })
  }
}
