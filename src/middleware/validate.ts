import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { AnyObject, Maybe, ObjectSchema, ValidationError } from 'yup'

export const validate = (
  schema: ObjectSchema<Maybe<AnyObject>>,
  handler: NextApiHandler
) => {
  return async (req: NextApiRequest, res: NextApiResponse<ValidationError>) => {
    try {
      req.body = await schema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      })
    } catch (error: unknown) {
      const ve = error as ValidationError
      res.status(400).json(ve)
    }

    await handler(req, res)
  }
}
