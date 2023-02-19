import { FilterQuery } from 'mongoose'
import { signJWT } from 'src/backend/api/auth'
import User, { UserDocument, UserInput } from '../models/user'

export const createUser = (user: UserInput) => {
  return User.create(user)
}

const findUser = (
  query: FilterQuery<UserDocument>,
  options = { lean: true }
) => {
  return User.findOne(query, null, options)
}

export const loginUser = async (
  email: UserDocument['email'],
  password: UserDocument['password']
): Promise<string | null> => {
  const user = await findUser({ email }, { lean: false })

  if (!user) return null
  return (await user.comparePassword(password)) ? signJWT(user) : null
}

export const deleteAllUsers = async () => {
  return User.deleteMany({})
}
