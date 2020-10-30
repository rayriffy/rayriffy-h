import React from 'react'

import { MenuAlt1 } from '@rayriffy-h/icons'

import { MobileSearch } from '../search/mobile'

interface IProps {
  onToggleSidebar?(): void
}

export const MobileHeader: React.FC<IProps> = React.memo(props => {
  const { onToggleSidebar = () => {} } = props

  return (
    <div className="relative z-10 flex-shrink-0 flex h-16 bg-white border-b border-gray-200 lg:hidden">
      <button
        onClick={onToggleSidebar}
        className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:bg-gray-100 focus:text-gray-600 lg:hidden"
        aria-label="Open sidebar"
      >
        <MenuAlt1 className="h-6 w-6" />
      </button>
      <MobileSearch />
    </div>
  )
})
