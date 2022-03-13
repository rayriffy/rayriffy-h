import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest, ev: NextFetchEvent) {
  console.log(req.geo.country)
  if (['th'].includes(req.geo.country.toLowerCase())) {
    return NextResponse.next()
  } else {
    return new Response(undefined, {
      status: 500,
    })
  }
}
