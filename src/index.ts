import cors from 'cors'
import express from 'express'
import { env } from './env'
import {
  channelsRouter,
  messagesRouter,
  statusRouter,
  usersRouter,
} from './routers'

const app = express()

app.use(cors(), express.json())

app.use(statusRouter)
app.use(channelsRouter)
app.use(messagesRouter)
app.use(usersRouter)

app.listen(env.PORT)
console.log(`Server is running on port ${env.PORT}`)
