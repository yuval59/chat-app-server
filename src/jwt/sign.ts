import { env } from '@/env'
import { sign } from 'jsonwebtoken'
import { TypeOf } from 'zod'
import { jwtPayloadShape } from '.'

export const signJwt = (user: TypeOf<typeof jwtPayloadShape>) =>
  sign(user, env.JWT_SECRET)
