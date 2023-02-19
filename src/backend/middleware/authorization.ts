import type { NextApiHandler } from 'next'
import { verifyJWT } from '../api/auth'
import { createResponse } from '../api/response'

export const authorization = (next: NextApiHandler): NextApiHandler => {
  return async (req, res) => {
    if (req.cookies.auth) {
      const auth = verifyJWT(req.cookies.auth)
      if (auth) return await next(req, res)
    }

    return res.status(401).json(createResponse(undefined, `Unauthorized`))
  }
}
