import React, { useState, useCallback, useEffect, useMemo } from 'react'

import { useRouter } from 'next/router'

// import { Unstable } from './unstable'
import { ServiceWorker } from './serviceWorker'
import { MobileHeader } from './header/mobile'
import { MobileOverlay } from './mobileOverlay'
import { DesktopHeader } from './header/destop'

export const AppLayout: React.FC = props => {
  const { children } = props

  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false)

  useEffect(() => {
    setSidebarOpen(false)
  }, [router])

  const onToggleSidebar = useCallback(() => setSidebarOpen(o => !o), [])

  const isHideLayout = useMemo(() => ['/og/[id]'].includes(router.pathname), [
    router.pathname,
  ])

  if (isHideLayout) {
    return (
      <React.Fragment>
        {/* boop */}
        {children}
      </React.Fragment>
    )
  } else {
    return (
      <React.Fragment>
        {/* <Unstable /> */}
        <div className="h-screen flex overflow-hidden bg-gray-50">
          <MobileOverlay show={sidebarOpen} onToggleSidebar={onToggleSidebar} />
          <DesktopHeader />
          <div className="flex flex-col w-0 flex-1 overflow-hidden">
            <MobileHeader onToggleSidebar={onToggleSidebar} />
            <main
              className="flex-1 relative z-0 overflow-y-auto focus:outline-none pb-6"
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
}
