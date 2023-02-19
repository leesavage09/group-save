import type { NextApiHandler } from 'next'
import { createResponse } from '../api/response'

export const log = (next: NextApiHandler): NextApiHandler => {
  return async (req, res) => {
    try {
      await next(req, res)
    } catch (error) {
      console.log('low', error) // TODO low priority errors / warnings
      if (!res.headersSent) {
        console.log(error) // TODO better logging
        return res.status(500).json(
          createResponse(undefined, {
            message: `Internal Server Error`,
          })
        )
      }
    }
  }
}
