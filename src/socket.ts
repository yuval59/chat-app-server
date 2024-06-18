import { SOCKET_EVENTS } from '@/constants'
import { env } from '@/env'
import { connectionHandler } from '@/handlers'
import { jwtPayloadShape } from '@/jwt'
import { Server } from 'socket.io'
import { TypeOf } from 'zod'

type Payload = TypeOf<typeof jwtPayloadShape>
type IncludePayload = { jwt: string; payload: Payload }
type IncludeRoom = { room: string }

type State = {
  jwt: string
  payload: Payload
  room: string
}
type SocketUpdateArgs =
  | IncludePayload
  | IncludeRoom
  | (IncludePayload & IncludeRoom)

// Tracks which socket has what JWT, so we can update this on db color update and compare locally instead of querying the db
// This way on a chat a client can't give us an old JWT
export class SocketState {
  #state: Record<string, State> = {}

  addSocket = (socketId: string, state: State) =>
    (this.#state[socketId] = state)
  updateSocket = (socketId: string, updateArgs: SocketUpdateArgs) => {
    if ('room' in updateArgs) this.#state[socketId].room = updateArgs.room
    if ('jwt' in updateArgs)
      this.#state[socketId] = {
        ...this.#state[socketId],
        jwt: updateArgs.jwt,
        payload: updateArgs.payload,
      }
  }
  removeSocket = (socketId: string) => delete this.#state[socketId]

  validateJwt = (socketId: string, jwt: string) =>
    this.#state[socketId].jwt == jwt
  getPayload = (socketId: string) => this.#state[socketId].payload
  getRoom = (socketId: string) => this.#state[socketId].room
}

const state = new SocketState(),
  server = new Server(env.SOCKET_PORT, {
    // Options
  })

server.on(SOCKET_EVENTS.CONNECTION, connectionHandler({ server, state }))

console.log(`Socket.io server is running on port ${env.SOCKET_PORT}`)
