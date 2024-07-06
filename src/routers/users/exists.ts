import { NextFunction, Request, Response } from 'express'
import { ERRORS } from '../../constants'
import { userExists } from '../../controllers'
import { jwtPayload } from '../../shapes'

export const Exists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Doesn't need safeParse since we know if everything is running properly, res.locals.jwt was just set to the parsed jwt during the verifyJWT middleware
    const { id: userId } = jwtPayload.parse(res.locals.jwt)
    if (!(await userExists(userId)))
      return res.status(404).send(ERRORS.USER_NOT_FOUND)

    next()
  } catch (err) {
    console.error(err)

    return res.sendStatus(500)
  }
}
