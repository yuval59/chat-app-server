import { NextFunction, Request, Response } from 'express'
import { messageQuery } from '../../shapes'

export const VerifyGet = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const parsed = messageQuery.safeParse(req.query)
    if (!parsed.success) return res.status(400).json(parsed.error)

    res.locals.getMessages = parsed.data

    next()
  } catch (err) {
    console.error(err)

    return res.sendStatus(500)
  }
}
