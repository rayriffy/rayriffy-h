import { useMemo } from 'react'
import { useRouter } from 'next/router'

export const useSearchAvailable = () => {
  const router = useRouter()

  const routeByType = {
    listing: ['/listing', '/listing/p/[page]'],
    collection: ['/collection'],
    home: ['/', '/p/[page]'],
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
