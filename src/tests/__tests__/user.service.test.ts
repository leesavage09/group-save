import {
  createUser,
  deleteAllUsers,
  loginUser,
} from 'src/backend/db/services/user.services'

describe('User Service', () => {
  afterAll(async () => {
    await deleteAllUsers()
  })

  const userPayload = {
    email: 'leesavage09@gmail.com',
    password: '1234',
  }

  describe('create user', () => {
    describe('with valid input', () => {
      it('should create a new user', async () => {
        const user = await createUser(userPayload)
        expect(user.password).toHaveLength(60)
        expect(user.email).toBe(userPayload.email)
      })
    })

    describe('with invalid input', () => {
      it('should throw a validation error', async () => {
        await expect(createUser(userPayload)).rejects.toThrow()
      })
    })
  })

  describe('log a user in', () => {
    describe('using a valid password', () => {
      it('should return true', async () => {
        expect(await loginUser(userPayload.email, userPayload.password)).toBe(
          true
        )
      })
    })

    describe('using an invalid password', () => {
      it('should return false', async () => {
        expect(await loginUser(userPayload.email, 'wrong password')).toBe(false)
      })
    })
  })
})
