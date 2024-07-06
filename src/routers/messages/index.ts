import { Request, Response, Router } from 'express'
import { ROUTES } from '../../constants'
import { createMessage, getMessages } from '../../controllers'
import { messageCreationBody, messageQuery } from '../../shapes'
import { verifyJWT } from '../verify-jwt'
import { CheckUser } from './check-user'
import { VerifyCreation } from './verify-creation'
import { VerifyGet } from './verify-get'

export const messagesRouter = Router()

messagesRouter.get(
  ROUTES.MESSAGES,
  [VerifyGet],
  async (req: Request, res: Response) => {
    try {
      return res.json(
        await getMessages(messageQuery.parse(res.locals.getMessages).channelId)
      )
    } catch (err) {
      console.error(err)

      res.sendStatus(500)
    }
  }
)

messagesRouter.post(
  ROUTES.MESSAGES,
  [verifyJWT, VerifyCreation, CheckUser],
  async (req: Request, res: Response) => {
    try {
      await createMessage(messageCreationBody.parse(res.locals.createMessage))

      return res.sendStatus(200)
    } catch (err) {
      console.error(err)

      res.sendStatus(500)
    }
  }
)
