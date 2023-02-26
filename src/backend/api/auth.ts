import { getCookie, setCookie } from 'cookies-next'
import { IncomingMessage, ServerResponse } from 'http'
import { base64url, EncryptJWT, jwtDecrypt } from 'jose'
import { NextApiRequest, NextApiResponse } from 'next'
import { UserDocument } from '../db/models/user'

export const jweSecret = (() => {
  const jweSecret = process.env.JWE_SECRET

  if (!jweSecret)
    throw new Error('Please define JWE_SECRET in the environment variables')

  return base64url.decode(jweSecret)
})()

export const encryptJWT = async (user: UserDocument) => {
  const payload = {
    user: {
      id: user.id,
      email: user.email,
    },
  }

  return await new EncryptJWT(payload)
    .setProtectedHeader({ alg: 'dir', enc: 'A128CBC-HS256' })
    .setExpirationTime('1h')
    .encrypt(jweSecret)
}

export const decryptJWT = async (jwt: string) => {
  const decrypted = await jwtDecrypt(jwt, jweSecret)
  return decrypted
}

export const verifyJWT = async (jwt: string) => {
  try {
    const decrypted = await decryptJWT(jwt)
    return !!decrypted
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

export const decryptJwtFromCookie = async (
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>
) => {
  const cookie = getCookie('auth', { req, res })
  return await decryptJWT(cookie as string)
}
