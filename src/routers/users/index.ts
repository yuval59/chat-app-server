import { Request, Response, Router } from 'express'
import { ROUTES } from '../../constants'
import { createUser, updateUser } from '../../controllers'
import { jwtPayload, userCreationBody, userUpdateQuery } from '../../shapes'
import { verifyJWT } from '../verify-jwt'
import { Exists } from './exists'
import { VerifyCreation } from './verify-creation'
import { VerifyUpdate } from './verify-update'

export const usersRouter = Router()

usersRouter.post(
  ROUTES.USERS,
  [VerifyCreation],
  async (req: Request, res: Response) => {
    try {
      return res.json(
        await createUser(userCreationBody.parse(res.locals.createUser))
      )
    } catch (err) {
      console.error(err)

      res.sendStatus(500)
    }
  }
)

usersRouter.patch(
  ROUTES.USERS,
  [verifyJWT, VerifyUpdate, Exists],
  async (req: Request, res: Response) => {
    try {
      return res.json(
        await updateUser(
          jwtPayload.parse(res.locals.jwt),
          userUpdateQuery.parse(res.locals.updateUser)
        )
      )
    } catch (err) {
      console.error(err)

      return res.sendStatus(500)
    }
  }
)
