import { SOCKET_EVENTS } from '@/constants'
import { UserController } from '@/db'
import { env } from '@/env'
import { jwtPayloadShape, signJwt } from '@/jwt'
import { SocketState } from '@/socket'
import { verify } from 'jsonwebtoken'
import { Socket } from 'socket.io'
import { v4 } from 'uuid'

export { connectionHandler } from './connection'

const random8BitHex = () =>
  Math.floor(Math.random() * (255 - 0 + 1) + 0).toString(16)

const makeNewUser = async (socket: Socket, state: SocketState) => {
  const newUser = {
      id: v4(),
      username: v4(),
      color: '#' + random8BitHex() + random8BitHex() + random8BitHex(),
    },
    signed = signJwt(newUser)

  await UserController.insertUser(newUser)

  state.updateSocket(socket.id, { jwt: signed, payload: newUser })

  socket.emit(SOCKET_EVENTS.NEW_USER, signed)
}

export const verifyJwtOrSign = (
  socket: Socket,
  state: SocketState,
  jwt: string
) => {
  verify(jwt, env.JWT_SECRET, async (err, decoded) => {
    const parsed = jwtPayloadShape.safeParse(decoded)

    // If the JWT we receive is malformed in any way, make a new user, sign a new JWT, and send it to the client
    if (err || !parsed.success) return await makeNewUser(socket, state)

    // If the userId from the JWT does not exist in the database (somehow), do the same
    if (!(await UserController.userExists(parsed.data.id)))
      return await makeNewUser(socket, state)

    state.addSocket(socket.id, { jwt, payload: parsed.data })
  })
}
