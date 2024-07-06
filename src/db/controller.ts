import { drizzle } from 'drizzle-orm/mysql2'
import mysql from 'mysql2'
import { env } from '../env'
import { schema } from './models'

const connection = mysql.createConnection({
  host: env.DB_HOST,
  port: env.DB_PORT,
  user: env.DB_USER,
  password: env.DB_PASS,
  database: env.DB_DATABASE,
})

const db = drizzle(connection, { schema, mode: 'default' })

export abstract class DBController {
  protected static readonly dbInstance = db
}
