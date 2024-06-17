import { COLOR } from '@/constants'
import { z } from 'zod'

export const jwtDataShape = z.object({
  id: z.string(),
  username: z.string(),
  color: COLOR,
})

export { verifyJWT } from './verify-jwt'
