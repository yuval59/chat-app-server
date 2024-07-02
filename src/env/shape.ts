import { z } from 'zod'

export const EnvShape = z.object({
  // Actual Server Stuff
  REST_PORT: z.string().transform((port) => parseInt(port)),
  SOCKET_PORT: z.string().transform((port) => parseInt(port)),

  JWT_SECRET: z.string(),

  // DB Corner
  DB_HOST: z.string(),
  DB_PORT: z.string().transform((port) => parseInt(port)),
  DB_USER: z.string(),
  DB_PASS: z.string(),
  DB_DATABASE: z.string(),
})
