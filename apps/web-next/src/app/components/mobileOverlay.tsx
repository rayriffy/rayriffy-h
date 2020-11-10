import React from 'react'

import { X } from '@rayriffy-h/icons'

import { Transition } from '@headlessui/react'

import { MobileNavbar } from './navbar/mobile'
import { Offline } from './offline'

interface IProps {
  show?: boolean
  onToggleSidebar?(): void
}

export const MobileOverlay: React.FC<IProps> = React.memo(props => {
  const { show = false, onToggleSidebar = () => {} } = props

  return (
    <div className="lg:hidden">
      <Transition show={show} className="fixed inset-0 flex z-40">
        <Transition.Child
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0">
            <div className="absolute inset-0 bg-gray-600 opacity-75"></div>
          </div>
        </Transition.Child>
        <Transition.Child
          enter="transition ease-in-out duration-300 transform"
          enterFrom="-translate-x-full"
          enterTo="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-full"
        >
          <React.Fragment>
            <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-white">
              <div className="absolute top-0 right-0 -mr-14 p-1">
                <button
                  onClick={onToggleSidebar}
                  className="flex items-center justify-center h-12 w-12 rounded-full focus:outline-none focus:bg-gray-600"
                  aria-label="Close sidebar"
                >
                  <X className="h-6 w-6 text-white" />
                </button>
              </div>
              <div className="px-4">
                <p className="font-bold text-3xl text-gray-800">Riffy H</p>
                <p className="text-xs text-gray-500">
                  {process.env.buildNumber}
                </p>
              </div>
              <Offline />
              <div className="mt-5 flex-1 h-0 overflow-y-auto">
                <MobileNavbar />
              </div>
            </div>
            <div className="flex-shrink-0 w-14">
              {/* Dummy element to force sidebar to shrink to fit close icon */}
            </div>
          </React.Fragment>
        </Transition.Child>
      </Transition>
    </div>
  )
})
