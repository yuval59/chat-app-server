import { z } from 'zod'
import { ERRORS } from './constants'

export const COLOR = z
  .string()
  .regex(new RegExp('^#(?:[0-9a-fA-F]{3}){1,2}$'), ERRORS.INVALID_HEX)

export const jwtPayload = z.object({
  id: z.string(),
  username: z.string(),
  color: COLOR,
})

// User Section
export const userUpdateQuery = z
  .object({
    username: z.string().optional(),
    color: COLOR.optional(),
  })
  .refine((user) => !!user.username || !!user.color, ERRORS.USER_UPDATE_NEITHER)

export const userCreationBody = z.object({
  username: z.string(),
  color: COLOR,
})

// Channel Section
export const channelCreationBody = z.object({
  channelName: z.string(),
})

// Message Section
export const messageQuery = z.object({
  channelId: z.string(),
})

export const messageCreationBody = z.object({
  channelId: z.string(),
  userId: z.string(),
  message: z.string(),
})
