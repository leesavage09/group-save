import { MongoServerError } from 'mongodb'
import { NextApiHandler } from 'next'
import { createResponse } from 'src/backend/api/response'
import { connectMongo } from 'src/backend/db/connectMongo'
import { createUser } from 'src/backend/db/services/user.services'
import { log } from 'src/backend/middleware/log'
import { validate } from 'src/backend/middleware/validate'
import { LoginSchema, loginSchema } from 'src/yup-schema/login'

const handler: NextApiHandler = async (req, res) => {
  await connectMongo()
  const user = req.body as LoginSchema
  try {
    const createdUser = await createUser(user)
    res
      .status(200)
      .json(createResponse(`User ${createdUser.email} was created`))
  } catch (error) {
    if (
      error instanceof Error &&
      error.name === 'MongoServerError' &&
      (error as MongoServerError).code === 11000
    ) {
      res
        .status(200)
        .json(
          createResponse(
            undefined,
            `Unable to signup ${user.email} the account already exists, please login instead`
          )
        )
    }

    throw error
  }
}

export default log(validate(loginSchema, handler))
