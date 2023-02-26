import type { NextApiHandler } from 'next'

export const log = (next: NextApiHandler): NextApiHandler => {
  return async (req, res) => {
    try {
      await next(req, res)
    } catch (error) {
      // TODO logging required
      if (!res.headersSent) {
        console.log(error)
        return res.status(200).json({
          success: false,
          message: `Internal Server Error`,
        })
      }
    }
  }
}
