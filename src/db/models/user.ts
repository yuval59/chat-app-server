import { sql } from 'drizzle-orm'
import { mysqlTable, timestamp, varchar } from 'drizzle-orm/mysql-core'

export const UserModel = mysqlTable('users', {
  id: varchar('id', { length: 36 }).primaryKey(),

  username: varchar('username', { length: 256 }).notNull(),
  color: varchar('color', { length: 20 }).notNull(),

  createdAt: timestamp('createdAt').default(sql`CURRENT_TIMESTAMP`),
})
