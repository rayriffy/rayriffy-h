import { NextRequest, NextResponse } from 'next/server'

const middleware = (req: NextRequest) => {
  console.log(`${req.url}\n${req.geo?.country}\n${req.headers.get('referer')}`)
  if (['robots.txt'].some(o => req.url.includes(o))) {
    return NextResponse.next()
  } else if (
    process.env.NODE_ENV === 'development' ||
    (['th', 'sg'].includes((req.geo?.country ?? '').toLowerCase()) &&
      (req.headers.get('referer') ?? '').startsWith(
        'https://xn--vdkuc.xn--dck3c9b5d7d.xn--q9jyb4c'
      ))
  ) {
    return NextResponse.next()
  } else {
    return new Response(undefined, {
      status: 500,
    })
  }
}

export const config = {
  matcher: ['/:path*'],
}

export default middleware
