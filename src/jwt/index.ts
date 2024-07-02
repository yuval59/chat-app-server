import { z } from 'zod'
import { COLOR } from '../constants'

export const jwtPayloadShape = z.object({
  id: z.string(),
  username: z.string(),
  color: COLOR,
})

export { signJwt } from './sign'
