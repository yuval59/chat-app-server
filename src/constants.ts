import { z } from 'zod'

export const RETRIEVAL_LIMIT = 500 as const

export const ROUTES = {
  STATUS: '/status',
  CHANNELS: '/channels',
  MESSAGES: '/messages',
  USERS: '/users',
  CHAT_SOCKET: '/chat',
} as const

export const COLOR = z
  .string()
  .regex(new RegExp('^#(?:[0-9a-fA-F]{3}){1,2}$'), 'Invalid hex color')
