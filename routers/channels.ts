import { Request, Response, Router } from 'express'
import { z } from 'zod'
import { ROUTES } from '../constants'
import { ChannelController } from '../db'

const newChannelBodyShape = z.object({
  channelName: z.string(),
})

export const channelsRouter = Router()

channelsRouter.get(
  ROUTES.CHANNELS,
  //   [verifyJWT],
  async (req: Request, res: Response) => {
    try {
      res.json({
        channels: await ChannelController.getChannels(),
      })
    } catch (err) {
      console.error(err)

      res.sendStatus(500)
    }
  }
)

channelsRouter.post(
  ROUTES.CHANNELS,
  // [levelRequired(1)],
  async (req: Request, res: Response) => {
    try {
      const parsed = newChannelBodyShape.safeParse(req.body)

      if (!parsed.success) return res.sendStatus(400)

      const { channelName } = parsed.data

      const channel = ChannelController.getChannelOrCreate(channelName)

      res.json({ status: 'Success', channel })
    } catch (err) {
      console.error(err)

      res.status(500).json({ status: 'Error' })
    }
  }
)
