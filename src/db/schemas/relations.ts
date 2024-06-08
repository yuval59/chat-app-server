import { relations } from 'drizzle-orm'
import { ChannelTable } from './channel'
import { MessageTable } from './message'

export const MessageRelations = relations(MessageTable, ({ one }) => ({
  channel: one(ChannelTable, {
    fields: [MessageTable.channelId],
    references: [ChannelTable.id],
  }),
}))

export const ChannelRelations = relations(ChannelTable, ({ many }) => ({
  messages: many(MessageTable),
}))
