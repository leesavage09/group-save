export const createResponse = (data?: unknown, error?: unknown) => {
  if (!data && !error) {
    throw Error('you must proved either data or error to createResponse')
  }
  return {
    data,
    error,
  }
}
