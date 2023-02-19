import { FilterQuery } from 'mongoose'
import User, { UserDocument, UserInput } from 'src/db/models/user'

export const createUser = (user: UserInput) => {
  return User.create(user)
}

export const findUser = (
  query: FilterQuery<UserDocument>,
  options = { lean: true }
) => {
  return User.findOne(query, null, options)
}

export const loginUser = async (
  email: UserDocument['email'],
  password: UserDocument['password']
) => {
  const user = await findUser({ email }, { lean: false })

  if (!user) throw Error('User dose not exist')

  return user.comparePassword(password)
}

export const deleteAllUsers = async () => {
  return User.deleteMany({})
}
