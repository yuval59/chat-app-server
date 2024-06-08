import { sql } from 'drizzle-orm'
import { mysqlTable, text, timestamp, varchar } from 'drizzle-orm/mysql-core'

export const MessageTable = mysqlTable('message', {
  id: varchar('id', { length: 36 }).primaryKey(),

  username: varchar('username', { length: 256 }).notNull(),
  message: text('message').notNull(),

  createdAt: timestamp('createdAt').default(sql`CURRENT_TIMESTAMP`),

  channelId: varchar('channelId', { length: 36 }).notNull(),
})
