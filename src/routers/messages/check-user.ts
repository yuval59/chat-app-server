import { NextFunction, Request, Response } from 'express'
import { ERRORS } from '../../constants'
import { jwtPayload, messageCreationBody } from '../../shapes'

export const CheckUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (
      messageCreationBody.parse(res.locals.createMessage).userId !=
      jwtPayload.parse(res.locals.jwt).id
    )
      return res.status(401).send(ERRORS.USERS_MISMATCH)

    next()
  } catch (err) {
    console.error(err)

    return res.sendStatus(500)
  }
}
