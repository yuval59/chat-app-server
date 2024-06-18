import { env } from '@/env'
import { jwtPayloadShape } from '@/jwt'
import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'

export const verifyJWT = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization
    if (!token) return res.sendStatus(400)

    verify(token.replace('Bearer ', ''), env.JWT_SECRET, (err, decoded) => {
      if (err) return res.status(401).json(err.message)

      const parsed = jwtPayloadShape.safeParse(decoded)
      if (!parsed.success) return res.status(400).send(parsed.error.issues)

      res.locals.jwt = parsed.data

      next()
    })
  } catch (err) {
    console.error(err)

    return res.sendStatus(500)
  }
}
