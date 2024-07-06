import { Request, Response, Router } from 'express'
import { ROUTES } from '../../constants'
import { createChannel, getChannels } from '../../controllers'
import { channelCreationBody } from '../../shapes'
import { VerifyCreation } from './verify-creation'

export const channelsRouter = Router()

channelsRouter.get(ROUTES.CHANNELS, async (req: Request, res: Response) => {
  try {
    res.json(await getChannels())
  } catch (err) {
    console.error(err)

    res.sendStatus(500)
  }
})

channelsRouter.post(
  ROUTES.CHANNELS,
  [VerifyCreation],
  async (req: Request, res: Response) => {
    try {
      await createChannel(
        channelCreationBody.parse(res.locals.createChannel).channelName
      )

      res.sendStatus(200)
    } catch (err) {
      console.error(err)

      res.status(500).json({ status: 'Error' })
    }
  }
)
