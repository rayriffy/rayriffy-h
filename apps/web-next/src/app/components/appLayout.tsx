import React, { useState, useCallback } from 'react'

import { Search } from '@rayriffy-h/icons'

import { DesktopNavbar } from './navbar/desktop'
import { Unstable } from './unstable'
import { ServiceWorker } from './serviceWorker'
import { MobileHeader } from './header/mobile'
import { MobileOverlay } from './mobileOverlay'

export const AppLayout: React.FC = props => {
  const { children } = props

  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false)

  const onToggleSidebar = useCallback(() => setSidebarOpen(o => !o), [])

  return (
    <React.Fragment>
      <Unstable />
      <div className="h-screen flex overflow-hidden bg-gray-50">
        <MobileOverlay show={sidebarOpen} onToggleSidebar={onToggleSidebar} />
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
          <MobileHeader onToggleSidebar={onToggleSidebar} />
          <main
            className="flex-1 relative z-0 overflow-y-auto focus:outline-none"
            tabIndex={0}
          >
            {children}
          </main>
        </div>
      </div>
      <ServiceWorker />
    </React.Fragment>
  )
}
