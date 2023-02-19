import type { NextApiHandler } from 'next'
import { Schema } from 'yup'
import { createResponse } from '../api/response'

export const validate = (
  schema: Schema,
  next: NextApiHandler
): NextApiHandler => {
  return async (req, res) => {
    try {
      req.body = await schema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      })
    } catch (error) {
      if (error instanceof Error && error.name === 'ValidationError') {
        res.status(400).json(createResponse(undefined, error))
        throw error
      }
    }

    await next(req, res)
  }
}