import { NextFunction, Request, Response } from 'express'
import { userCreationBody } from '../../shapes'

export const VerifyCreation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const parsed = userCreationBody.safeParse(req.body)
    if (!parsed.success) return res.status(400).send(parsed.error.issues)

    res.locals.createUser = parsed.data

    next()
  } catch (err) {
    console.error(err)

    return res.sendStatus(500)
  }
}
