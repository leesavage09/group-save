import { NextRequest, NextResponse } from 'next/server'
import { verifyJWT } from './backend/api/auth'

const protectedRoutes = ['/dashboard']
const publicOnlyRoutes = ['/signin', '/signup']
const sharedRoutes = ['/assets', '/_next', '/api']

const isRouteMatch = (request: NextRequest, array: Array<string>) => {
  return array.some((rx) => request.nextUrl.pathname.match(rx))
}

const handleValidToken = (request: NextRequest) => {
  if (isRouteMatch(request, publicOnlyRoutes)) {
    return NextResponse.redirect(new URL(protectedRoutes[0], request.url))
  }
  return
}

const handleNoToken = (request: NextRequest) => {
  if (isRouteMatch(request, protectedRoutes)) {
    return NextResponse.redirect(new URL(publicOnlyRoutes[0], request.url))
  }
}

const handleMalformedToken = (request: NextRequest) => {
  console.log('log: handleMalformedToken') // TODO improve logging
  return handleNoToken(request)
}

const authorization = async (request: NextRequest) => {
  if (isRouteMatch(request, sharedRoutes)) {
    console.log('shared', request.url)
    return
  }

  const jwt = request.cookies.get('auth')?.value
  if (jwt) {
    try {
      if (await verifyJWT(jwt)) return handleValidToken(request)
    } catch (error) {
      return handleMalformedToken(request)
    }
  }
  return handleNoToken(request)
}

export default authorization
