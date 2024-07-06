import { sign } from 'jsonwebtoken'
import { z } from 'zod'
import { env } from './env'
import { jwtPayload } from './shapes'

export type JwtPayload = z.infer<typeof jwtPayload>

export const signJwt = (user: JwtPayload) => sign(user, env.JWT_SECRET)
