import { sql } from 'drizzle-orm'
import { mysqlTable, text, timestamp, varchar } from 'drizzle-orm/mysql-core'
import { ChannelTable } from './channel'

export const MessageTable = mysqlTable('messages', {
  id: varchar('id', { length: 36 }).primaryKey(),

  message: text('message').notNull(),

  userId: varchar('userId', { length: 36 }).notNull(),

  channelId: varchar('channelId', { length: 36 })
    .references(() => ChannelTable.id, { onDelete: 'cascade' })
    .notNull(),

  createdAt: timestamp('createdAt').default(sql`CURRENT_TIMESTAMP`),
})
