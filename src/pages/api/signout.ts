import { setAuthCookie } from 'src/backend/api/auth'
import { ApiHandler, okResponse } from 'src/backend/api/response'
import { log } from 'src/backend/middleware/log'

const handler: ApiHandler = async (req, res) => {
  setAuthCookie(null, req, res)
  res.status(200).json(okResponse)
}

export default log(handler)
