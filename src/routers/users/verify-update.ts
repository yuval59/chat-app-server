import { NextFunction, Request, Response } from 'express'
import { userUpdateQuery } from '../../shapes'

export const VerifyUpdate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const parsed = userUpdateQuery.safeParse(req.query)
    if (!parsed.success) return res.status(400).send(parsed.error.issues)

    res.locals.updateUser = parsed.data

    next()
  } catch (err) {
    console.error(err)

    return res.sendStatus(500)
  }
}
