import { getCookie, setCookie } from 'cookies-next'
import { IncomingMessage, ServerResponse } from 'http'
import { jwtVerify, SignJWT } from 'jose'
import { NextApiRequest, NextApiResponse } from 'next'
import { UserDocument } from '../db/models/user'

export const jwtSecret = (() => {
  const jwtSecret = process.env.JWT_SECRET

  if (!jwtSecret)
    throw new Error('Please define JWT_SECRET in the environment variables')

  return new TextEncoder().encode(jwtSecret)
})()

export const signJWT = (user: UserDocument) => {
  return new SignJWT({
    user: {
      id: user.id,
      email: user.email,
    },
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('1h')
    .sign(jwtSecret)
}

export const decodeJWT = async (jwt: string) => {
  const decoded = await jwtVerify(jwt, jwtSecret)
  return decoded
}

export const verifyJWT = async (jwt: string) => {
  try {
    const decoded = await decodeJWT(jwt)
    return !!decoded
  } catch (error) {
    return false
  }
}

export const setAuthCookie = (
  jwt: string | null,
  req: NextApiRequest,
  res: NextApiResponse
) => {
  setCookie('auth', jwt, {
    req,
    res,
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    maxAge: jwt ? 3600 : 0,
    path: '/',
  })
}

export const decodeJwtFromCookie = async (
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>
) => {
  const cookie = getCookie('auth', { req, res })
  return await decodeJWT(cookie as string)
}
