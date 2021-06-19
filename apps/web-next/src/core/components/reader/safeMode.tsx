import React, { useCallback } from 'react'

import { InformationCircleIcon } from '@heroicons/react/outline'
import { useStoreon } from '@rayriffy-h/state-engine'

export const SafeMode: React.FC = React.memo(props => {
  const { settings, dispatch } = useStoreon('settings')

  const toggleSafeMode = useCallback(
    () => dispatch('setting/toggle', 'safemode'),
    []
  )

  if (settings.safemode) {
    return (
      <div className="pt-4">
        <div className="bg-white shadow overflow-hidden rounded-md text-gray-900 text-sm">
          <div className="px-4 py-4 sm:px-6">
            <h2 className="uppercase text-gray-900 font-bold pb-1">
              <InformationCircleIcon className="w-6 h-6 inline mr-1" />
              Information
            </h2>
            Safe mode has been enabled! Modify this behavior in settings.
          </div>
          <div className="bg-gray-50 px-4 py-4 sm:px-6">
            <div className="text-sm leading-5">
              <button
                onClick={toggleSafeMode}
                className="font-medium text-red-600 hover:text-red-500 transition ease-in-out duration-150 text-sm"
              >
                Disable
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  } else {
    return null
  }
})
