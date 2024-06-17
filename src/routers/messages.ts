import { ROUTES } from '@/constants'
import { MessageController } from '@/db'
import { Router, type Request, type Response } from 'express'
import { v4 } from 'uuid'
import { z } from 'zod'
import { jwtDataShape, verifyJWT } from './middleware'

const getMessagesBodyShape = z.object({
  channelId: z.string(),
})

const messageData = z.object({
  channelId: z.string(),
  messages: z.string().array(),
})

export const messagesRouter = Router()

messagesRouter.get(
  ROUTES.MESSAGES,
  //   [verifyJWT],
  async (req: Request, res: Response) => {
    try {
      const parsed = getMessagesBodyShape.safeParse(req.query)
      if (!parsed.success) return res.status(400).json(parsed.error)

      const { channelId } = parsed.data

      return res.json({
        messages: await MessageController.getMessagesByChannelId(channelId),
      })
    } catch (err) {
      console.error(err)

      res.sendStatus(500)
    }
  }
)

messagesRouter.post(
  ROUTES.MESSAGES,
  [verifyJWT],
  async (req: Request, res: Response) => {
    try {
      const parsed = messageData.safeParse(req.body)
      if (!parsed.success) return res.status(400).send(parsed.error.issues)

      // Doesn't need safeParse since we know if everything is running properly res.locals.jwt was just set to the parsed jwt during the verifyJWT middleware
      const jwt = jwtDataShape.parse(res.locals.jwt)
      const messages = parsed.data.messages.map((message) => ({
        userId: jwt.id,
        channelId: parsed.data.channelId,
        message,
        id: v4(),
      }))

      await Promise.all(
        messages.map((message) => MessageController.insertMessage(message))
      )

      return res.json({ messages })
    } catch (err) {
      console.error(err)

      res.sendStatus(500)
    }
  }
)
