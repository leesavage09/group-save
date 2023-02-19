import cookie from 'cookie'
import { sign, verify } from 'jsonwebtoken'
import { UserDocument } from '../db/models/user'

export const jwtSecret = (() => {
  const jwtSecret = process.env.JWT_SECRET

  if (!jwtSecret)
    throw new Error('Please define JWT_SECRET in the environment variables')

  return jwtSecret
})()

export const signJWT = (user: UserDocument) => {
  return sign(
    {
      user: {
        id: user.id,
        email: user.email,
      },
    },
    jwtSecret,
    { expiresIn: '1h' }
  )
}

export const verifyJWT = (jwt: string) => {
  try {
    const decoded = verify(jwt, jwtSecret)
    return !!decoded
  } catch (error) {
    return false
  }
}

export const setAuthCookie = (jwt: string | null) => {
  return cookie.serialize('auth', jwt || '', {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    maxAge: jwt ? 3600 : 0,
    path: '/',
  })
}