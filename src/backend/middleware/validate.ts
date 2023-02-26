import type { NextApiHandler } from 'next'
import { Schema } from 'yup'

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
        res.status(200).json({
          success: false,
          message: 'Validation Error',
          data: error,
        })
        throw error
      }
    }

    await next(req, res)
  }
}
