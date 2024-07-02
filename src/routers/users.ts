import { Request, Response, Router } from 'express'
import { v4 } from 'uuid'
import { z } from 'zod'
import { COLOR, ERRORS, ROUTES } from '../constants'
import { UserController } from '../db'
import { jwtPayloadShape, signJwt } from '../jwt'
import { verifyJWT } from './middleware'

export const usersRouter = Router()

const userCreationShape = z.object({
  username: z.string(),
  color: COLOR,
})

const userUpdateShape = z
  .object({
    username: z.string().optional(),
    color: COLOR.optional(),
  })
  .refine((user) => !!user.username || !!user.color, ERRORS.USER_UPDATE_NEITHER)

usersRouter.post(ROUTES.USERS, async (req: Request, res: Response) => {
  try {
    const parsed = userCreationShape.safeParse(req.body)
    if (!parsed.success) return res.status(400).send(parsed.error.issues)

    const { username, color } = parsed.data

    const user = { id: v4(), username, color }

    await UserController.insertUser(user)

    return res.json({ user, jwt: signJwt(user) })
  } catch (err) {
    console.error(err)

    res.sendStatus(500)
  }
})

usersRouter.patch(
  ROUTES.USERS,
  [verifyJWT],
  async (req: Request, res: Response) => {
    try {
      const parsed = userUpdateShape.safeParse(req.query)
      if (!parsed.success) return res.status(400).send(parsed.error.issues)

      const { color, username } = parsed.data

      // Doesn't need safeParse since we know if everything is running properly, res.locals.jwt was just set to the parsed jwt during the verifyJWT middleware
      const current = jwtPayloadShape.parse(res.locals.jwt),
        { id: userId } = current

      if (!(await UserController.userExists(userId)))
        return res.status(404).send(ERRORS.USER_NOT_FOUND)

      if (color) await UserController.updateColor(userId, color)
      if (username) await UserController.updateUsername(userId, username)

      return res.json({
        jwt: signJwt({
          id: userId,
          color: color ?? current.color,
          username: username ?? current.username,
        }),
      })
    } catch (err) {
      console.error(err)

      return res.sendStatus(500)
    }
  }
)
