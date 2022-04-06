import { useEffect, useState } from 'react'

export const useCache = (cacheName: string) => {
  const [text, setText] = useState<string>('--')

  useEffect(() => {
    setText('--')

    window.caches
      .open(cacheName)
      .then(cache => {
        cache.keys().then(keys => {
          setText(keys.length.toLocaleString())
        })
      })
      .catch(() => setText('Failed'))
  }, [cacheName])

  return text
}
