import { NextApiHandler } from 'next'
import { getAuthCookie } from 'src/backend/api/auth'
import { createResponse } from 'src/backend/api/response'
import { connectMongo } from 'src/backend/db/connectMongo'
import { loginUser } from 'src/backend/db/services/user.services'
import { log } from 'src/backend/middleware/log'
import { validate } from 'src/backend/middleware/validate'
import { LoginSchema, loginSchema } from 'src/yup-schema/login'

const handler: NextApiHandler = async (req, res) => {
  await connectMongo()
  const user = req.body as LoginSchema
  const jwt = await loginUser(user.email, user.password)

  if (jwt) {
    res.setHeader('Set-Cookie', getAuthCookie(jwt))
    return res.status(200).json(createResponse({ message: `Ok` }))
  }

  res
    .status(200)
    .json(createResponse(undefined, `Username or password incorrect`))
}

export default log(validate(loginSchema, handler))
