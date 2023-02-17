import bcrypt from 'bcrypt'
import mongoose from 'mongoose'

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

userSchema.index({ email: 1 })

userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  const user = this as UserDocument
  return bcrypt.compare(candidatePassword, user.password).catch(() => false)
}

export default mongoose.model<UserDocument>('User', userSchema)
