import { sign } from 'jsonwebtoken'
import { TypeOf } from 'zod'
import { jwtPayloadShape } from '.'
import { env } from '../env'

export const signJwt = (user: TypeOf<typeof jwtPayloadShape>) =>
  sign(user, env.JWT_SECRET)
