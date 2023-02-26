import { NextApiRequest, NextApiResponse } from 'next'

export type ApiHandler = (
  req: NextApiRequest,
  res: NextApiResponse<GsResponse>
) => unknown | Promise<unknown>

export type GsResponse = {
  data?: unknown
  message: string
  success?: boolean
}

export const okResponse = { message: 'Ok', success: true } as GsResponse
