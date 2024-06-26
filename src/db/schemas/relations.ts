import { relations } from 'drizzle-orm'
import { ChannelTable } from './channel'
import { MessageTable } from './message'
import { UserTable } from './user'

export const MessageRelations = relations(MessageTable, ({ one }) => ({
  channel: one(ChannelTable, {
    fields: [MessageTable.channelId],
    references: [ChannelTable.id],
  }),
  user: one(UserTable, {
    fields: [MessageTable.userId],
    references: [UserTable.id],
  }),
}))

export const ChannelRelations = relations(ChannelTable, ({ many }) => ({
  messages: many(MessageTable),
}))

export const UserRelations = relations(UserTable, ({ many }) => ({
  messages: many(MessageTable),
}))
