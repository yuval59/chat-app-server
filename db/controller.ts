import { drizzle } from 'drizzle-orm/planetscale-serverless'
import mysql from 'mysql2'
import { env } from '../env'
import { schema } from './schemas'

const connection = mysql.createConnection({
  host: env.DB_HOST,
  port: env.DB_PORT,
  user: env.DB_USER,
  password: env.DB_PASS,
  database: env.DB_DATABASE,
})

const db = drizzle(connection, { schema })

export abstract class Controller {
  protected static readonly dbInstance = db
}
