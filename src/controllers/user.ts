import { v4 } from 'uuid'
import { z } from 'zod'
import { UserDBController } from '../db/user'
import { JwtPayload, signJwt } from '../jwt'
import { userCreationBody } from '../shapes'

type UserCreationParams = z.infer<typeof userCreationBody>

export const userExists = async (userId: string) =>
  (await UserDBController.getUserById(userId)) ? true : false

export const createUser = async (params: UserCreationParams) => {
  const user = { ...params, id: v4() }

  await UserDBController.createUser({ ...user, createdAt: new Date() })

  return { user, jwt: signJwt(user) }
}

export const updateUser = async (
  jwtPayload: JwtPayload,
  data: { username?: string; color?: string }
) => {
  const { id, color: currentColor, username: currentUsername } = jwtPayload,
    { color, username } = data

  const user = {
    id,
    color: color || currentColor,
    username: username || currentUsername,
  }

  await UserDBController.updateUser(id, user)

  return { jwt: signJwt(user) }
}

// z.string().regex(new RegExp('^#(?:[0-9a-fA-F]{3}){1,2}$'), ERRORS.INVALID_HEX)
