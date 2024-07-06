import { NextFunction, Request, Response } from 'express'
import { channelCreationBody } from '../../shapes'

export const VerifyCreation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const parsed = channelCreationBody.safeParse(req.body)
    if (!parsed.success) return res.status(400).send(parsed.error.issues)

    res.locals.createChannel = parsed.data

    next()
  } catch (err) {
    console.error(err)

    return res.sendStatus(500)
  }
}
