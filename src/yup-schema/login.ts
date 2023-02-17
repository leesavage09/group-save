import { object, Schema, string } from 'yup'

export interface LoginSchema {
  email: string
  password: string
}

export const loginSchema: Schema<LoginSchema> = object({
  email: string().email().required('Email is required'),
  password: string().required('Password is required'),
})
