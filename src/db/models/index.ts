export { ChannelModel } from './channel'
export { MessageModel } from './message'
export { UserModel } from './user'

import { ChannelModel } from './channel'
import { MessageModel } from './message'
import { UserModel } from './user'

import { ChannelRelations, MessageRelations, UserRelations } from './relations'

export const schema = {
  ChannelTable: ChannelModel,
  ChannelRelations,

  MessageTable: MessageModel,
  MessageRelations,

  UserTable: UserModel,
  UserRelations,
}
