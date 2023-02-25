export interface GsResponse {
  data?: unknown
  message: string
  success?: boolean
}

export const createResponse = ({
  data,
  message,
  success = true,
}: GsResponse) => {
  return {
    data,
    message,
    success,
  }
}

export const okResponse = createResponse({ message: 'Ok', success: true })
