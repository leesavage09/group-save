import {
  createUser,
  deleteAllUsers,
  loginUser,
} from 'src/backend/db/services/user.services'

describe('User Service', () => {
  beforeAll(async () => {
    await deleteAllUsers()
  })

  const userPayload = {
    email: 'test@email.com',
    password: '1234',
  }

  describe('create user', () => {
    it('with valid input, should create a new user', async () => {
      const user = await createUser(userPayload)
      expect(user.password).toHaveLength(60)
      expect(user.email).toBe(userPayload.email)
    })

    it('with invalid input, should throw a validation error', async () => {
      await expect(createUser(userPayload)).rejects.toThrow()
    })
  })

  describe('log a user in', () => {
    it('should return true with a valid password', async () => {
      expect(await loginUser(userPayload.email, userPayload.password)).toBe(
        true
      )
    })

    it('should return false with an invalid password', async () => {
      expect(await loginUser(userPayload.email, 'wrong password')).toBe(false)
    })

    it('should return false with an invalid email', async () => {
      expect(await loginUser('unknown email', 'wrong password')).toBe(false)
    })
  })
})
