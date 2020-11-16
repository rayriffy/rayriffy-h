import { useMemo } from 'react'
import { useRouter } from 'next/router'
import { SearchStore } from '@rayriffy-h/state-engine'

type RouteByType = {
  [key in keyof SearchStore['search']]: string[]
}

export const useSearchAvailable = () => {
  const router = useRouter()

  console.log(router)

  const routeByType: RouteByType = {
    listing: ['/listing/[[...page]]'],
    collection: ['/collection'],
    main: ['/', '/p/[page]'],
  }

  const availableType = useMemo(
    () =>
      (Object.entries(routeByType).find(([key, val]) =>
        val.includes(router.pathname)
      ) ?? [])[0],
    [router]
  )

  return {
    availableType,
    isAvailable: availableType !== undefined,
  }
}
