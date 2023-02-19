import mongoose, { Mongoose } from 'mongoose'

declare global {
  // eslint-disable-next-line no-var
  var mongoose: { conn?: Mongoose; promise?: Promise<Mongoose> }
}

global.mongoose = { conn: undefined, promise: undefined }
mongoose.set('strictQuery', true)

export const connectMongo = async () => {
  const uri =
    process.env.NODE_ENV === 'test'
      ? process.env.MONGO_TEST_URI
      : process.env.MONGO_URI
  if (!uri) {
    throw new Error(
      'Please define the MONGO_URI & MONGO_TEST_URI environment variables'
    )
  }

  if (global.mongoose.conn) return global.mongoose.conn

  if (!global.mongoose.promise) {
    const opts = {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      // bufferCommands: false,
      // bufferMaxEntries: 0,
      // useFindAndModify: true,
      // useCreateIndex: true,
    }

    global.mongoose.promise = mongoose.connect(uri, opts)
  }

  return (global.mongoose.conn = await global.mongoose.promise)
}
