import { Router, type Request, type Response } from 'express'
import { ROUTES } from '../constants'

export const statusRouter = Router()

statusRouter.get(
  ROUTES.STATUS,
  //   [verifyJWT],
  async (req: Request, res: Response) => {
    try {
      res.json({
        status: 'OK!',
      })
    } catch (err) {
      console.error(err)

      res.sendStatus(500)
    }
  }
)
