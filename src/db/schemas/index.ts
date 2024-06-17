export { ChannelTable } from './channel'
export { MessageTable } from './message'
export { UserTable } from './user'

import { ChannelTable } from './channel'
import { MessageTable } from './message'
import { UserTable } from './user'

import { ChannelRelations, MessageRelations, UserRelations } from './relations'

export const schema = {
  ChannelTable,
  ChannelRelations,

  MessageTable,
  MessageRelations,

  UserTable,
  UserRelations,
}
