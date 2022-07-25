import { NextRequest, NextResponse } from 'next/server'

const middleware = (req: NextRequest) => {
  console.log(`${req.url}\n${req.headers.get('referer')}\n${req.geo?.country}`)
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
