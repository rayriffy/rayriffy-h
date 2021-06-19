import React from 'react'

import { ArchiveIcon, BookOpenIcon, PhotographIcon } from '@heroicons/react/outline'

import { Cache } from './cache'

export const Caches: React.FC = React.memo(props => {
  return (
    <React.Fragment>
      <h3 className="text-lg leading-6 font-medium text-gray-900 pt-2 px-4 md:px-0">
        Offline Storage
      </h3>
      <p className="text-gray-500 px-4 md:px-0">
        Any pages or images that you have accessed before can also be accessed
        when device goes offline as well. You can visualize of how much data has
        been cached into your device and purge them from here.
      </p>
      <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <Cache
          cacheName="next-image-assets"
          title="Total images"
          icon={PhotographIcon}
        />
        <Cache
          cacheName="next-galleries"
          title="Total galleries"
          icon={BookOpenIcon}
        />
        <Cache
          cacheName="next-listing"
          title="Total listing pages"
          icon={ArchiveIcon}
        />
      </div>
    </React.Fragment>
  )
})
