import { ROUTES } from '@/constants'
import { MessageController } from '@/db'
import { Router, type Request, type Response } from 'express'
import { z } from 'zod'

const getMessagesBodyShape = z.object({
  channelId: z.string(),
})

const messageData = z.object({
  channelId: z.string(),
  messages: z
    .object({
      message: z.string(),
      username: z.string(),
    })
    .array(),
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
  //   [verifyJWT],
  async (req: Request, res: Response) => {
    try {
      const parsed = messageData.safeParse(req.body)
      if (!parsed.success) return res.sendStatus(400)

      const { channelId, messages } = parsed.data

      console.log(messages)

      await MessageController.insertMessages(
        ...messages.map((message) => ({ ...message, channelId }))
      )

      return res.json({ status: 'Success' })
    } catch (err) {
      console.error(err)

      res.sendStatus(500)
    }
  }
)
