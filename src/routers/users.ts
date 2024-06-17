import { COLOR, ROUTES } from '@/constants'
import { UserController } from '@/db'
import { env } from '@/env'
import { Router, type Request, type Response } from 'express'
import { sign } from 'jsonwebtoken'
import { v4 } from 'uuid'
import { z, type TypeOf } from 'zod'
import { jwtDataShape, verifyJWT } from './middleware'

export const usersRouter = Router()

const userCreationData = z.object({
  username: z.string(),
  color: COLOR,
})

const userUpdateData = z
  .object({
    username: z.string().optional(),
    color: COLOR.optional(),
  })
  .refine(
    (user) => !!user.username || !!user.color,
    'Please enter something to update'
  )

const signJwt = (user: TypeOf<typeof jwtDataShape>) =>
  sign(user, env.JWT_SECRET)

usersRouter.post(ROUTES.USERS, async (req: Request, res: Response) => {
  try {
    const parsed = userCreationData.safeParse(req.body)
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
      const parsed = userUpdateData.safeParse(req.query)
      if (!parsed.success) return res.status(400).send(parsed.error.issues)

      const { color, username } = parsed.data

      // Doesn't need safeParse since we know if everything is running properly res.locals.jwt was just set to the parsed jwt during the verifyJWT middleware
      const jwt = jwtDataShape.parse(res.locals.jwt),
        id = jwt.id

      if (color) UserController.updateColor(id, color)
      if (username) UserController.updateUsername(id, username)

      return res.json({
        jwt: signJwt({
          id,
          color: color ?? jwt.color,
          username: username ?? jwt.username,
        }),
      })
    } catch (err) {
      console.error(err)

      return res.sendStatus(500)
    }
  }
)
