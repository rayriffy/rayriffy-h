import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest, ev: NextFetchEvent) {
  if (['th'].includes(req.geo.country.toLowerCase())) {
    return NextResponse.next()
  } else {
    return new Response('')
  }
}
