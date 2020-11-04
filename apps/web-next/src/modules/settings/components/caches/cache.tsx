import React, { useCallback, useState } from 'react'

import { Exclamation } from '@rayriffy-h/icons'

import { Transition } from '@headlessui/react'

import { useCache } from '../../services/useCache'

interface IProps {
  cacheName: string
  icon: React.FC<React.SVGProps<SVGSVGElement>>
  title: string
}

export const Cache: React.FC<IProps> = React.memo(props => {
  const [modal, setModal] = useState<boolean>(false)
  const [isProgress, setIsProgress] = useState<boolean>(!false)
  const nextImages = useCache(props.cacheName)

  const toggleModal = useCallback(() => setModal(o => !o), [])

  const handleRemoveCache = useCallback(async () => {
    setIsProgress(true)

    // Progress
    const cache = await caches.open(props.cacheName)
    const keys = await cache.keys()

    await Promise.all(
      await keys.map(async key => {
        return await cache.delete(key)
      })
    )

    setIsProgress(false)
    setModal(false)
  }, [])

  return (
    <div className="bg-white overflow-hidden shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex items-center">
          <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
            <props.icon className="h-6 w-6 text-white" />
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm leading-5 font-medium text-gray-500 truncate">
                {props.title}
              </dt>
              <dd className="text-2xl leading-8 font-semibold text-gray-900">
                {nextImages}
              </dd>
            </dl>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 px-4 py-4 sm:px-6">
        <div className="text-sm leading-5">
          <button
            className="font-medium text-red-600 hover:red-blue-500 transition ease-in-out duration-150"
            onClick={toggleModal}
          >
            Clear all
          </button>
        </div>
      </div>
      <Transition
        show={modal}
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
            &#8203;
            <div
              className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                  <Exclamation className="h-6 w-6 text-red-600" />
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3
                    className="text-lg leading-6 font-medium text-gray-900"
                    id="modal-headline"
                  >
                    Heads up!
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm leading-5 text-gray-500">
                      Are you sure you want to remove{' '}
                      <b className="text-gray-700">{props.title}</b> cache?
                      Cached data will be permanently removed from device
                      forever. This action cannot be undone.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                  <button
                    type="button"
                    onClick={handleRemoveCache}
                    disabled={isProgress}
                    className={`inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 text-base leading-6 font-medium text-white shadow-sm focus:outline-none focus:shadow-outline-red transition ease-in-out duration-150 sm:text-sm sm:leading-5 ${
                      isProgress
                        ? 'bg-red-400 hover:bg-red-300 focus:border-red-500'
                        : 'bg-red-600 hover:bg-red-500 focus:border-red-700'
                    }`}
                  >
                    {isProgress ? 'Removing...' : 'Remove'}
                  </button>
                </span>
                <span className="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
                  <button
                    type="button"
                    onClick={toggleModal}
                    className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                  >
                    Cancel
                  </button>
                </span>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  )
})
