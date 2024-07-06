import { NextFunction, Request, Response } from 'express'
import { messageCreationBody } from '../../shapes'

export const VerifyCreation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const parsed = messageCreationBody.safeParse(req.body)
    if (!parsed.success) return res.status(400).send(parsed.error.issues)

    res.locals.createMessage = parsed.data

    next()
  } catch (err) {
    console.error(err)

    return res.sendStatus(500)
  }
}
