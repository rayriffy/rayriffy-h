import React, { useCallback, useMemo } from 'react'

import { useStoreon } from '@rayriffy-h/state-engine'
import { Hentai } from '@rayriffy-h/helper'
import { Heart, Minus, Plus } from '@rayriffy-h/icons'

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
        className="inline-flex items-center p-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-pink-600 hover:bg-pink-500 focus:outline-none focus:border-pink-700 focus:shadow-outline-pink active:bg-pink-700 transition ease-in-out duration-150"
        onClick={toggleFavorite}
      >
        {isFavorited ? (
          <Minus className="w-6 h-6" />
        ) : (
          <Plus className="w-6 h-6" />
        )}
      </button>
    </span>
  )
})
