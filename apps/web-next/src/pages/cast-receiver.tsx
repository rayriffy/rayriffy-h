import React, { useEffect, useState } from 'react'

import { NextPage } from 'next'
import ScriptLoader from 'next/dist/client/experimental-script'

import { getGoogleCastMessageNamespace } from '../core/services/getGoogleCastMessageNamespace'

// import {  } from 'chromecast-caf-receiver'

const Page: NextPage = props => {
  const [isCastReady, setIsCastReady] = useState<boolean>(false)

  const intitializeCastReciver = async () => {
    console.log('hey yoooo')
    const context = cast.framework.CastReceiverContext.getInstance()
    context.start()

    setIsCastReady(true)
  }

  useEffect(() => {
    if (isCastReady) {
      cast.framework.CastReceiverContext.getInstance().addCustomMessageListener(
        getGoogleCastMessageNamespace('rayriffy-h.controller'),
        () => {}
      )
    }
  }, [isCastReady])

  return (
    <React.Fragment>
      <div className="p-8">
        <h1 className="font-bold text-2xl text-gray-900">
          This should be displayed on TV
        </h1>
      </div>
      <ScriptLoader
        src="https://www.gstatic.com/cast/sdk/libs/caf_receiver/v3/cast_receiver_framework.js"
        preload
        onLoad={intitializeCastReciver}
      />
    </React.Fragment>
  )
}

export default Page
