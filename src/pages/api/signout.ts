import { NextApiHandler } from 'next'
import { getAuthCookie } from 'src/backend/api/auth'
import { okResponse } from 'src/backend/api/response'
import { log } from 'src/backend/middleware/log'

const handler: NextApiHandler = async (req, res) => {
  res.setHeader('Set-Cookie', getAuthCookie(null))
  res.status(200).json(okResponse)
}

export default log(handler)
