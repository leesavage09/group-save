import type { NextApiRequest, NextApiResponse } from 'next'
import { Schema, ValidationError } from 'yup'

export interface ValidatedRequest<T = any> extends NextApiRequest {
  yupObject: T
}

export type NextHandler = (
  req: ValidatedRequest,
  res: NextApiResponse
) => Promise<void>

export const validate = (schema: Schema, next: NextHandler) => {
  return async (
    req: ValidatedRequest<Schema>,
    res: NextApiResponse<ValidationError>
  ) => {
    try {
      req.yupObject = await schema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      })
    } catch (error: unknown) {
      return res.status(400).json(error as ValidationError)
    }

    await next(req, res)
  }
}
