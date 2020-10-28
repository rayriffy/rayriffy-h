import React, { useState } from 'react'

import { MenuAlt1, Search, X } from '@rayriffy-h/icons'

import { Transition } from '../../core/components/transition'
import { DesktopNavbar } from './navbar/desktop'
import { MobileNavbar } from './navbar/mobile'
import { Unstable } from './unstable'

export const AppLayout: React.FC = props => {
  const { children } = props

  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false)

  return (
    <React.Fragment>
      <Unstable />
      <div className="h-screen flex overflow-hidden bg-gray-50">
        {sidebarOpen && (
          <div className="lg:hidden">
            <div className="fixed inset-0 flex z-40">
              <Transition
                show={sidebarOpen}
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
              </Transition>
              <Transition
                show={sidebarOpen}
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
                        onClick={() => setSidebarOpen(o => !o)}
                        className="flex items-center justify-center h-12 w-12 rounded-full focus:outline-none focus:bg-gray-600"
                        aria-label="Close sidebar"
                      >
                        <X className="h-6 w-6 text-white" />
                      </button>
                    </div>
                    <div className="px-4">
                      <p className="font-bold text-3xl text-gray-800">
                        Riffy H
                      </p>
                      <p className="text-xs text-gray-500">
                        {process.env.buildNumber}
                      </p>
                    </div>
                    <div className="mt-5 flex-1 h-0 overflow-y-auto">
                      <MobileNavbar />
                    </div>
                  </div>
                  <div className="flex-shrink-0 w-14">
                    {/* Dummy element to force sidebar to shrink to fit close icon */}
                  </div>
                </React.Fragment>
              </Transition>
            </div>
          </div>
        )}
        <div className="hidden lg:flex lg:flex-shrink-0">
          <div className="flex flex-col w-64 border-r border-gray-200 pt-5 pb-4 bg-gray-100">
            <div className="px-6">
              <p className="font-bold text-3xl text-gray-800">Riffy H</p>
              <p className="text-xs text-gray-500">{process.env.buildNumber}</p>
            </div>
            <div className="h-0 flex-1 flex flex-col overflow-y-auto">
              <div className="px-3 mt-5">
                <label htmlFor="search" className="sr-only">
                  Search
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="mr-3 h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    id="search"
                    className="form-input block w-full pl-9 sm:text-sm sm:leading-5"
                    placeholder="Search"
                  />
                </div>
              </div>
              <DesktopNavbar />
            </div>
          </div>
        </div>
        <div className="flex flex-col w-0 flex-1 overflow-hidden">
          <div className="relative z-10 flex-shrink-0 flex h-16 bg-white border-b border-gray-200 lg:hidden">
            <button
              onClick={() => setSidebarOpen(o => !o)}
              className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:bg-gray-100 focus:text-gray-600 lg:hidden"
              aria-label="Open sidebar"
            >
              <MenuAlt1 className="h-6 w-6" />
            </button>
            <div className="flex-1 flex justify-between px-4 sm:px-6 lg:px-8">
              <div className="flex-1 flex">
                <form className="w-full flex md:ml-0" action="#" method="GET">
                  <label htmlFor="search_field" className="sr-only">
                    Search
                  </label>
                  <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                    <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                      <Search className="h-5 w-5" />
                    </div>
                    <input
                      id="search_field"
                      className="block w-full h-full pl-8 pr-3 py-2 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 sm:text-sm"
                      placeholder="Search"
                      type="search"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
          <main
            className="flex-1 relative z-0 overflow-y-auto focus:outline-none"
            tabIndex={0}
          >
            {children}
          </main>
        </div>
      </div>
    </React.Fragment>
  )
}
