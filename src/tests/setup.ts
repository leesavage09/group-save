import { connectMongo } from 'src/db/connectMongo'

beforeAll(async () => {
  await connectMongo()
})
