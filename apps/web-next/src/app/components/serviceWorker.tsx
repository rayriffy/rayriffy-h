import { FunctionComponent, memo, useEffect, useMemo, useState } from 'react'

import { SpeakerphoneIcon, XIcon } from '@heroicons/react/outline'

export const ServiceWorker = memo(() => {
  const [serviceWorkerStatus, setServiceWorkerStatus] = useState<string>('init')
  const [dismiss, setDismiss] = useState<boolean>(false)

  const isInstalled = useMemo(
    () =>
      serviceWorkerStatus === 'onServiceWorkerUpdateReady' ||
      serviceWorkerStatus === 'onServiceWorkerInstalled',
    [serviceWorkerStatus]
  )

  useEffect(() => {
    // Service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then(reg => {
          console.log('Service worker installed! ', reg)

          // Check upadte found
          reg.addEventListener(`updatefound`, () => {
            setServiceWorkerStatus('onServiceWorkerUpdateFound')

            const installingWorker = reg.installing
            console.log(`installingWorker`, installingWorker)

            installingWorker?.addEventListener(`statechange`, () => {
              switch (installingWorker.state) {
                case `installed`:
                  if (navigator.serviceWorker.controller) {
                    setServiceWorkerStatus('onServiceWorkerUpdateReady')
                  } else {
                    setServiceWorkerStatus('onServiceWorkerInstalled')
                  }
                  break

                // case `redundant`:
                //   setServiceWorkerStatus('onServiceWorkerRedundant')
                //   break

                // case `activated`:
                //   setServiceWorkerStatus('onServiceWorkerActive')
                //   break
              }
            })
          })
        })
        .catch(e => {
          console.error(`Error during service worker registration:`, e)
        })

      // destroy gatsby cache
      caches.keys().then(keys => {
        keys.map(async key => {
          if (key.startsWith('gatsby-plugin-offline')) {
            await caches.delete(key)
          }
        })
      })
    }
  }, [])

  const getShortDescription = (code: string) => {
    switch (code) {
      case 'onServiceWorkerUpdateFound':
        return 'Updating application...'
      case 'onServiceWorkerInstalled':
        return 'Ready to use when offline!'
      case 'onServiceWorkerUpdateReady':
        return 'Update completed! Please reload'
      default:
        return '###'
    }
  }

  const getFullDescription = (code: string) => {
    switch (code) {
      case 'onServiceWorkerUpdateFound':
        return `Updating Riffy H to ${process.env.buildNumber}!`
      case 'onServiceWorkerInstalled':
        return 'Ready to use when offline!'
      case 'onServiceWorkerUpdateReady':
        return 'Update completed! Please reload to newer version of Riffy H'
      default:
        return '###'
    }
  }

  if (
    !dismiss &&
    serviceWorkerStatus !== 'init' &&
    serviceWorkerStatus !== 'onServiceWorkerActive'
  ) {
    return (
      <div className="fixed bottom-0 inset-x-0 pb-2 sm:pb-5">
        <div className="max-w-screen-xl mx-auto px-2 sm:px-6 lg:px-8">
          <div
            className={`p-2 rounded-lg shadow-lg sm:p-3 ${
              isInstalled ? 'bg-green-600' : 'bg-gray-600'
            }`}
          >
            <div className="flex items-center justify-between flex-wrap">
              <div className="w-0 flex-1 flex items-center">
                <span
                  className={`flex p-2 rounded-lg ${
                    isInstalled ? 'bg-green-800' : 'bg-gray-800'
                  }`}
                >
                  <SpeakerphoneIcon className="h-6 w-6 text-white" />
                </span>
                <p className="ml-3 font-medium text-white truncate">
                  <span className="md:hidden">
                    {getShortDescription(serviceWorkerStatus)}
                  </span>
                  <span className="hidden md:inline">
                    {getFullDescription(serviceWorkerStatus)}
                  </span>
                </p>
              </div>
              {serviceWorkerStatus === 'onServiceWorkerUpdateReady' ? (
                <div className="order-3 mt-2 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto">
                  <div className="rounded-md shadow-sm">
                    <div
                      onClick={() => window.location.reload()}
                      className="cursor-pointer flex items-center justify-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-gray-600 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline transition ease-in-out duration-150"
                    >
                      Reload
                    </div>
                  </div>
                </div>
              ) : null}
              <div className="order-2 flex-shrink-0 sm:order-3 sm:ml-2">
                <button
                  type="button"
                  onClick={() => setDismiss(true)}
                  className={`-mr-1 flex p-2 rounded-md focus:outline-none transition ease-in-out duration-150 ${
                    isInstalled
                      ? 'hover:bg-green-500 focus:bg-green-500'
                      : 'hover:bg-gray-500 focus:bg-gray-500'
                  }`}
                  aria-label="Dismiss"
                >
                  <XIcon className="h-6 w-6 text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  } else {
    return null
  }
})
