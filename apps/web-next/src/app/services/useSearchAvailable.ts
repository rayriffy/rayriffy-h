import { useMemo } from 'react'
import { useRouter } from 'next/router'
import { SearchStore } from '@rayriffy-h/state-engine'

type RouteByType = {
  [key in keyof SearchStore['search']]: string[]
}

export const useSearchAvailable = () => {
  const router = useRouter()

  const routeByType: RouteByType = {
    listing: ['/listing', '/listing/p/[page]'],
    collection: ['/collection'],
    main: ['/', '/p/[page]'],
  }

  const availableType = useMemo(
    () =>
      (Object.entries(routeByType).find(([key, val]) =>
        val.includes(router.route)
      ) ?? [])[0],
    [router]
  )

  return {
    availableType,
    isAvailable: availableType !== undefined,
  }
}
