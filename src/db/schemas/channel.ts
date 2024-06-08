import { mysqlTable, varchar } from 'drizzle-orm/mysql-core'

export const ChannelTable = mysqlTable('channels', {
  id: varchar('id', { length: 36 }).primaryKey(),
  name: varchar('name', { length: 256 }).notNull(),
})
