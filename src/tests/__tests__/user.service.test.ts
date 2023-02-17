import { deleteAllUsers } from '../../db/services/user.services'

describe('User Service', () => {
  afterEach(async () => {
    await deleteAllUsers()
  })

  const userPayload = {
    email: 'leesavage09@gmail.com',
    password: '1234',
  }

  describe('create user', () => {
    describe('with valid input', () => {
      it.todo('should create a new user')
    })
  })

  describe('log a user in', () => {
    describe('using a valid password', () => {
      it.todo('should return true')
    })

    describe('using an invalid password', () => {
      it.todo('should return false')
    })
  })
})
