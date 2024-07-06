export const RETRIEVAL_LIMIT = 500 as const

export const ROUTES = {
  STATUS: '/status',
  CHANNELS: '/channels',
  USERS: '/users',
  MESSAGES: '/messages',
} as const

export const SOCKET_EVENTS = {
  // Basic server events
  CONNECTION: 'connection',
  DISCONNECTION: 'disconnect',

  ERROR: 'error',

  UPDATE_CHANNEL: 'update_channel',
  GET_CHANNELS: 'get_channels',

  NEW_USER: 'new_user',
  UPDATE_USER: 'update_user',

  NEW_MESSAGE: 'message',
  MESSAGE_HISTORY: 'history',
} as const

export const ERRORS = {
  USER_UPDATE_NEITHER: 'Please enter something to update',
  JWT_MISMATCH: 'JWT expired',
  USER_NOT_FOUND: 'User not found',
  INVALID_HEX: 'Invalid hex color',
  USERS_MISMATCH: 'The userId is not equal to the JWT id',
} as const
