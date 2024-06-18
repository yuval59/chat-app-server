import cors from 'cors'
import express from 'express'
import { env } from './env'
import {
  channelsRouter,
  messagesRouter,
  statusRouter,
  usersRouter,
} from './routers'

const start = () => {
  const server = express()

  server.use(cors(), express.json())

  server.use(statusRouter)
  server.use(channelsRouter)
  server.use(messagesRouter)
  server.use(usersRouter)

  server.listen(env.REST_PORT)
  console.log(`REST server is running on port ${env.REST_PORT}`)
}

export default start
