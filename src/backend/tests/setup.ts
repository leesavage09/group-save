import { connectMongo } from 'src/backend/db/connectMongo'

beforeAll(async () => {
  await connectMongo()
})
