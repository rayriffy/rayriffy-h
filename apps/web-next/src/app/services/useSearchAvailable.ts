import { useMemo } from 'react'
import { useRouter } from 'next/router'
import { SearchStore } from '@rayriffy-h/state-engine'

type RouteByType = {
  [key in keyof SearchStore['search']]: string[]
}

export const useSearchAvailable = () => {
  const { pathname } = useRouter()

  const routeByType: RouteByType = {
    listing: ['/listing/[[...page]]'],
    collection: ['/collection'],
    main: ['/', '/p/[page]'],
  }

  const availableType = useMemo(() => {
    return (Object.entries(routeByType).find(([key, val]) =>
      val.includes(pathname)
    ) ?? [])[0]
  }, [pathname])

  return {
    availableType,
    isAvailable: availableType !== undefined,
  }
}
