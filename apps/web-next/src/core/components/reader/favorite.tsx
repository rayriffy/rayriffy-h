import React, { useCallback, useMemo } from 'react'

import { useStoreon } from '@rayriffy-h/state-engine'
import { Hentai } from '@rayriffy-h/helper'
import { MinusIcon, PlusIcon } from '@heroicons/react/outline'

interface IProps {
  hentai: Hentai
}

export const Favorite: React.FC<IProps> = React.memo(props => {
  const { hentai } = props

  const { dispatch, collection } = useStoreon('collection')

  const isFavorited = useMemo(
    () =>
      collection.data.find(o => Number(o.id) === Number(hentai.id)) !==
      undefined,
    [collection]
  )

  const toggleFavorite = useCallback(() => {
    const isFavorited =
      collection.data.find(
        o =>
          (Number.isSafeInteger(Number(o.id)) ? Number(o.id) : o.id) ===
          hentai.id
      ) === undefined

    let res = collection.data

    if (!isFavorited) {
      res = res.filter(
        o =>
          (Number.isSafeInteger(Number(o.id)) ? Number(o.id) : o.id) !==
          hentai.id
      )
    } else {
      res = [
        {
          id: hentai.id,
          internal: false,
          data: { ...hentai, images: { ...hentai.images, pages: [] } },
        },
        ...res,
      ]
    }

    dispatch('collection/override', {
      collection: {
        ...collection,
        data: res,
      },
    })
  }, [collection])

  return (
    <span className="inline-flex rounded-md shadow-sm">
      <button
        type="button"
        className="inline-flex items-center p-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
        onClick={toggleFavorite}
      >
        {isFavorited ? (
          <MinusIcon className="w-6 h-6" />
        ) : (
          <PlusIcon className="w-6 h-6" />
        )}
      </button>
    </span>
  )
})
