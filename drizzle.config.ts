import 'dotenv/config'
import { defineConfig } from 'drizzle-kit'
import { env } from './src/env'

const host = env.DB_HOST
const port = env.DB_PORT
const user = env.DB_USER
const password = env.DB_PASS
const database = env.DB_DATABASE

export default defineConfig({
  out: './drizzle',
  schema: ['./src/db/schemas'],

  dialect: 'mysql',
  dbCredentials: {
    host,
    port,
    user,
    password,
    database,
  },
})
