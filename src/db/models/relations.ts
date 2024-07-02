import { relations } from 'drizzle-orm'
import { ChannelModel } from './channel'
import { MessageModel } from './message'
import { UserModel } from './user'

export const MessageRelations = relations(MessageModel, ({ one }) => ({
  channel: one(ChannelModel, {
    fields: [MessageModel.channelId],
    references: [ChannelModel.id],
  }),
  user: one(UserModel, {
    fields: [MessageModel.userId],
    references: [UserModel.id],
  }),
}))

export const ChannelRelations = relations(ChannelModel, ({ many }) => ({
  messages: many(MessageModel),
}))

export const UserRelations = relations(UserModel, ({ many }) => ({
  messages: many(MessageModel),
}))
