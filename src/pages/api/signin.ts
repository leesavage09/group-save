import { getAuthCookie } from 'src/backend/api/auth'
import { ApiHandler, okResponse } from 'src/backend/api/response'
import { connectMongo } from 'src/backend/db/connectMongo'
import { loginUser } from 'src/backend/db/services/user.services'
import { log } from 'src/backend/middleware/log'
import { validate } from 'src/backend/middleware/validate'
import { LoginSchema, loginSchema } from 'src/yup-schema/login'

const handler: ApiHandler = async (req, res) => {
  await connectMongo()
  const user = req.body as LoginSchema
  const jwt = await loginUser(user.email, user.password)

  if (jwt) {
    res.setHeader('Set-Cookie', getAuthCookie(jwt))
    return res.status(200).json(okResponse)
  }

  res.status(200).json({
    success: false,
    message: 'Username or password incorrect',
  })
}

export default log(validate(loginSchema, handler))
