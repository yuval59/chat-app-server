import 'dotenv/config'
import { z } from 'zod'
import { EnvShape } from './shape'

export const getEnvVariables = (): z.infer<typeof EnvShape> => {
  const parsed = EnvShape.safeParse(process.env)

  if (!parsed.success) throw parsed.error

  return parsed.data
}
