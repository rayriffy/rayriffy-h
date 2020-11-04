import React from 'react'

import { Archive, Photograph, Server } from '@rayriffy-h/icons'

import { Cache } from './cache'

export const Caches: React.FC = React.memo(props => {
  return (
    <React.Fragment>
      <h3 className="text-lg leading-6 font-medium text-gray-900 pt-2 px-4 md:px-0">
        Offline Storage
      </h3>
      <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <Cache
          cacheName="next-image-assets"
          title="Total images"
          icon={Photograph}
        />
        <Cache
          cacheName="next-galleries"
          title="Total galleries"
          icon={Server}
        />
        <Cache
          cacheName="next-listing"
          title="Total listing pages"
          icon={Archive}
        />
      </div>
    </React.Fragment>
  )
})
