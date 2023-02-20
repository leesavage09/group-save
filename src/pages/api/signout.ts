import { NextApiHandler } from 'next'
import { getAuthCookie } from 'src/backend/api/auth'
import { createResponse } from 'src/backend/api/response'
import { log } from 'src/backend/middleware/log'

const handler: NextApiHandler = async (req, res) => {
  res.setHeader('Set-Cookie', getAuthCookie(null))
  res.status(200).json(createResponse({ message: `Ok` }))
}

export default log(handler)
