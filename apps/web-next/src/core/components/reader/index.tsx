import React, { useEffect, useState } from 'react'

import { getImageUrl, Hentai } from '@rayriffy-h/helper'
import { useStoreon } from '@rayriffy-h/state-engine'

import ScriptLoader from 'next/dist/client/experimental-script'

import { ImageBlur } from '../imageBlur'
import { TagRenderer } from './tagRenderer'
import { PagesRenderer } from './pagesRenderer'
import { SafeMode } from './safeMode'
import { Favorite } from './favorite'
import { GoogleCastLauncher } from '../googleCastLauncher'
import { CastSession } from 'chromecast-caf-receiver/cast.framework'

interface IProps {
  hentai: Hentai
  excludes?: number[]
}

export const Reader: React.FC<IProps> = React.memo(props => {
  const { hentai, excludes = [] } = props

  const { dispatch } = useStoreon('history', 'metadata')

  const [castSession, setCastSession] = useState<CastSession | undefined>()

  useEffect(() => {
    dispatch('metadata/viewCount/count')
    dispatch('history/toggle', {
      internal: false,
      data: hentai,
    })
  }, [])

  const intitializeCastSender = async () => {
    // const { cast } = chrome
    // set options
    console.log('hello')
    cast.framework.CastContext.getInstance().setOptions({
      receiverApplicationId: 'F951321A',
      autoJoinPolicy: chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED,
    })
    const session = cast.framework.CastContext.getInstance().getCurrentSession()
    console.log(session)
    setCastSession(session)
  }

  // useEffect(() => {
  //   if (window.cast !== undefined) {
  //     console.log('ok')
  //     // set options
  //     cast.framework.CastContext.getInstance().setOptions({
  //       receiverApplicationId: 'F951321A',
  //       autoJoinPolicy: chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED,
  //     })

  //     const session = cast.framework.CastContext.getInstance().getCurrentSession()
  //     console.log(session)
  //     setCastSession(session)
  //   }
  // }, [window.cast])

  useEffect(() => {
    window['__onGCastApiAvailable'] = (isAvailable: boolean) => {
      if (isAvailable) {
        intitializeCastSender()
      }
    }
  }, [])

  return (
    <React.Fragment>
      <div className="max-w-3xl mx-auto block md:flex pt-0 md:pt-10">
        <div className="p-8 md:p-0">
          <div className="flex justify-center">
            <div className="overflow-hidden rounded-md">
              <ImageBlur
                src={getImageUrl({
                  image: hentai.images.cover,
                  type: 'cover',
                  mediaId: hentai.media_id,
                })}
                alt="cover"
                width={hentai.images.cover.w}
                height={hentai.images.cover.h}
              />
            </div>
          </div>
          <SafeMode />
        </div>
        <div className="text-gray-800 pl-6">
          <p className="font-semibold text-gray-500 text-md">{hentai.id}</p>
          <h1 className="font-bold text-2xl leading-tight pt-2 text-gray-700">
            {hentai.title.pretty}
          </h1>
          <h2 className="font-bold text-gray-500 text-md">
            {hentai.title.japanese}
          </h2>
          <span className="text-gray-500 text-sm font-bold">
            {hentai.images.pages.length - excludes.length} Pages
          </span>
          <TagRenderer tags={hentai.tags} />
          <div className="py-6 space-x-4">
            <Favorite hentai={hentai} />
            <GoogleCastLauncher />
          </div>
        </div>
      </div>
      <div className="py-4">
        <div className="bg-gray-100 p-4 break-all">
          {JSON.stringify(castSession)}
        </div>
      </div>
      <PagesRenderer
        pages={hentai.images.pages}
        mediaId={hentai.media_id}
        excludes={excludes}
      />
      <ScriptLoader
        src="https://www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1"
        preload
      />
    </React.Fragment>
  )
})
