import type { NextApiHandler } from 'next'
import { createResponse } from '../api/response'

export const log = (next: NextApiHandler): NextApiHandler => {
  return async (req, res) => {
    try {
      await next(req, res)
    } catch (error) {
      console.log('low', error) // TODO low priority errors / warnings
      if (!res.headersSent) {
        return res.status(200).json(
          createResponse({
            success: false,
            message: `Internal Server Error`,
          })
        )
      }
    }
  }
}
