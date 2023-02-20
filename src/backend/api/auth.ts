import cookie from 'cookie'
import { jwtVerify, SignJWT } from 'jose'
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

export const verifyJWT = async (jwt: string) => {
  try {
    const decoded = await jwtVerify(jwt, jwtSecret)
    return !!decoded
  } catch (error) {
    return false
  }
}

export const getAuthCookie = (jwt: string | null) => {
  return cookie.serialize('auth', jwt || '', {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    maxAge: jwt ? 3600 : 0,
    path: '/',
  })
}
