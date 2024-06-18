import { COLOR } from '@/constants'
import { z } from 'zod'

export const jwtPayloadShape = z.object({
  id: z.string(),
  username: z.string(),
  color: COLOR,
})

export { signJwt } from './sign'
