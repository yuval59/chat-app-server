import { z } from 'zod'

export const jwtDataShape = z.object({
  role: z.object({
    name: z.string(),
    level: z.number().default(0),
  }),
})
