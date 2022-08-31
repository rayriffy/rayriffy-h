import { NextRequest, NextResponse } from 'next/server'

const middleware = (req: NextRequest) => {
  if (['robots.txt'].some(o => req.url.includes(o))) {
    return NextResponse.next()
  } else if (
    process.env.NODE_ENV === 'development' ||
    ['th', 'sg'].includes((req.geo?.country ?? '').toLowerCase())
  ) {
    return NextResponse.next()
  } else {
    return new Response(undefined, {
      status: 451,
    })
  }
}

export const config = {
  matcher: ['/:path*'],
}

export default middleware
