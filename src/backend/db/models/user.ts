import bcrypt from 'bcrypt'
import mongoose, { CallbackWithoutResultAndOptionalError } from 'mongoose'

export interface UserInput {
  email: string
  password: string
}

export interface UserDocument extends UserInput, mongoose.Document {
  createdAt: Date
  updatedAt: Date
  comparePassword(candidatePassword: string): Promise<boolean>
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
})

const hashPassword = function (
  this: UserDocument,
  next: CallbackWithoutResultAndOptionalError
) {
  bcrypt.hash(this.password, 10, async (error, hash) => {
    if (error) throw error
    this.password = hash
    next()
  })
}

userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  const user = this as UserDocument
  return bcrypt.compare(candidatePassword, user.password).catch(() => false)
}

userSchema.index({ email: 1 })

userSchema.pre('save', hashPassword)

export default (mongoose.models.User as mongoose.Model<UserDocument>) ||
  mongoose.model<UserDocument>('User', userSchema)
