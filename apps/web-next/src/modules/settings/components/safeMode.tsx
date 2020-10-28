import React from 'react'

import { useStoreon } from '@rayriffy-h/state-engine'

export const SafeMode: React.FC = props => {
  const { settings, dispatch } = useStoreon('settings')
  return (
    <div className="bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3
          className="text-lg leading-6 font-medium text-gray-900"
          id="renew-headline"
        >
          Blur all images
        </h3>
        <div className="mt-2 sm:flex sm:items-start sm:justify-between">
          <div className="max-w-xl text-sm leading-5 text-gray-500">
            <p id="renew-description">
              When this behavior is enabled, all images will be blurred out.
              Preventing you from accidentally open unsafe image on public.
            </p>
          </div>
          <div className="mt-5 sm:mt-0 sm:ml-6 sm:flex-shrink-0 sm:flex sm:items-center">
            <span
              role="checkbox"
              tabIndex={0}
              aria-checked="false"
              aria-labelledby="renew-headline"
              aria-describedby="renew-description"
              onClick={() => {
                dispatch('setting/toggle', 'safemode')
              }}
              className={`${
                settings.safemode ? 'bg-green-600' : 'bg-gray-200'
              } relative inline-block flex-no-shrink h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:shadow-outline`}
            >
              <span
                aria-hidden="true"
                className={`${
                  settings.safemode ? 'translate-x-5' : 'translate-x-0'
                } inline-block h-5 w-5 rounded-full bg-white shadow transform transition ease-in-out duration-200`}
              ></span>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
