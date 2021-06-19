import { FunctionComponent } from 'react'

import { useStoreon } from '@rayriffy-h/state-engine'

export const SafeMode: FunctionComponent = () => {
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
          <button
            type="button"
            className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${
              settings.safemode ? 'bg-green-600' : 'bg-gray-200'
            }`}
            role="switch"
            aria-checked={settings.safemode.toString() as 'true' | 'false'}
            onClick={() => {
              dispatch('setting/toggle', 'safemode')
            }}
          >
            <span className="sr-only">Use setting</span>
            <span
              aria-hidden="true"
              className={`translate-x-0 pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 ${
                settings.safemode ? 'translate-x-5' : 'translate-x-0'
              }`}
            ></span>
          </button>
        </div>
      </div>
    </div>
  )
}
