import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest, ev: NextFetchEvent) {
  if (['robots.txt'].some(o => req.url.includes(o))) {
    return NextResponse.next()
  } else if (['th', 'sg'].includes(req.geo.country.toLowerCase())) {
    return NextResponse.next()
  } else {
    return new Response(undefined, {
      status: 500,
    })
  }
}
