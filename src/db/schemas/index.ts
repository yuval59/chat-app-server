export { ChannelTable } from './channel'
export { MessageTable } from './message'

import { ChannelTable } from './channel'
import { MessageTable } from './message'

import { ChannelRelations, MessageRelations } from './relations'

export const schema = {
  ChannelTable,
  ChannelRelations,

  MessageTable,
  MessageRelations,
}
