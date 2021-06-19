import React, { useState } from 'react'

import { XIcon } from '@heroicons/react/outline'

export const Unstable: React.FC = React.memo(props => {
  const [show, setShow] = useState<boolean>(true)

  if (show) {
    return (
      <div className="relative bg-orange-600">
        <div className="max-w-screen-xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
          <div className="pr-16 sm:text-center sm:px-16">
            <p className="font-medium text-white">
              <span className="md:hidden">This site is under development</span>
              <span className="hidden md:inline">
                This site is still under heavy development!
              </span>
              <span className="block sm:ml-2 sm:inline-block">
                <a
                  href="https://h.rayriffy.com"
                  className="text-white font-bold underline"
                >
                  Back to old site &rarr;
                </a>
              </span>
            </p>
          </div>
          <div className="absolute inset-y-0 right-0 pt-1 pr-1 flex items-start sm:pt-1 sm:pr-2 sm:items-start">
            <button
              type="button"
              onClick={() => setShow(false)}
              className="flex p-2 rounded-md hover:bg-orange-500 focus:outline-none focus:bg-orange-500 transition ease-in-out duration-150"
              aria-label="Dismiss"
            >
              <XIcon className="h-6 w-6 text-white" />
            </button>
          </div>
        </div>
      </div>
    )
  } else {
    return null
  }
})
