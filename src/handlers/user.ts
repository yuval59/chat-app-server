import { Socket } from 'socket.io'
import { z } from 'zod'
import { COLOR, ERRORS, SOCKET_EVENTS } from '../constants'
import { UserController } from '../db'
import { signJwt } from '../jwt'
import { SocketState } from '../socket'

const userUpdateEventShape = (socketId: string, state: SocketState) =>
  z
    .object({
      jwt: z.string(),
      username: z.string().optional(),
      color: COLOR.optional(),
    })
    .refine(
      ({ username, color }) => !!username || !!color,
      ERRORS.USER_UPDATE_NEITHER
    )
    .refine(({ jwt }) => state.validateJwt(socketId, jwt), ERRORS.JWT_MISMATCH)

type UserUpdateArgs = { socket: Socket; state: SocketState }
export const userUpdateHandler =
  (args: UserUpdateArgs) => async (event: unknown) => {
    const { socket, state } = args,
      parsed = userUpdateEventShape(socket.id, state).safeParse(event)
    if (!parsed.success)
      return socket.emit(SOCKET_EVENTS.ERROR, {
        event: SOCKET_EVENTS.UPDATE_USER,
        error: parsed.error.issues[0].message,
      })

    const { color, username } = parsed.data,
      current = state.getPayload(socket.id),
      { id: userId } = current

    if (color) await UserController.updateColor(userId, color)
    if (username) await UserController.updateUsername(userId, username)

    const payload = {
        id: userId,
        color: color ?? current.color,
        username: username ?? current.username,
      },
      signed = signJwt(payload)

    state.updateSocket(socket.id, { jwt: signed, payload })

    socket.emit(SOCKET_EVENTS.UPDATE_USER, signed)

    console.log(`Successfully updated user ${userId}`)
  }
