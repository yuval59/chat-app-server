import { SOCKET_EVENTS } from '@/constants'
import { env } from '@/env'
import { connectionHandler } from '@/handlers'
import { jwtPayloadShape } from '@/jwt'
import { Server } from 'socket.io'
import { TypeOf } from 'zod'

// Tracks which socket has what JWT, so we can update this on db color update and compare locally instead of querying the db
// This way on a chat a client can't give us an old JWT
type State = { jwt: string; payload: TypeOf<typeof jwtPayloadShape> }
export class SocketState {
  #state: Record<string, State> = {}

  addSocket = (socketId: string, state: State) =>
    (this.#state[socketId] = state)
  updateSocket = (socketId: string, state: State) =>
    (this.#state[socketId] = state)
  removeSocket = (socketId: string) => delete this.#state[socketId]

  validateJwt = (socketId: string, jwt: string) =>
    this.#state[socketId].jwt == jwt
  getPayload = (socketId: string) => this.#state[socketId].payload
}

const server = new Server(env.SOCKET_PORT, {
  // Options
})

server.on(
  SOCKET_EVENTS.CONNECTION,
  connectionHandler(server, new SocketState())
)

console.log(`Socket.io server is running on port ${env.SOCKET_PORT}`)
