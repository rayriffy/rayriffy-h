import React from 'react'

import { tags } from '@rayriffy-h/datasource'

import Link from 'next/link'
import { useRouter } from 'next/router'

import { capitalize } from 'lodash'

import { menus } from '../../constants/menu'

export const MobileNavbar: React.FC = props => {
  const router = useRouter()

  return (
    <nav className="px-2">
      <div className="space-y-1">
        {menus.map((menu, i) => (
          <Link href={menu.link} key={`navbar-mobile-link-${menu.name}-${i}`}>
            <a
              className={`group flex items-center px-2 py-2 text-base leading-5 font-medium rounded-md focus:outline-none transition ease-in-out duration-150 ${
                menu.link === router.pathname
                  ? 'text-gray-900 bg-gray-100 hover:bg-gray-100 focus:bg-gray-200 hover:text-gray-900'
                  : 'text-gray-600 hover:bg-gray-50 focus:bg-gray-50 hover:text-gray-90'
              }`}
            >
              <menu.icon
                className={`mr-3 h-6 w-6 group-hover:text-gray-500 group-focus:text-gray-600 transition ease-in-out duration-150 ${
                  menu.link === router.pathname
                    ? 'text-gray-500'
                    : 'text-gray-400'
                }`}
              />
              {menu.name}
            </a>
          </Link>
        ))}
      </div>
      <div className="mt-8">
        <h3
          className="px-3 text-xs leading-4 font-semibold text-gray-500 uppercase tracking-wider"
          id="teams-headline"
        >
          Tags
        </h3>
        <div
          className="mt-1 space-y-1"
          role="group"
          aria-labelledby="teams-headline"
        >
          {tags.map(tag => (
            <a
              href="#"
              key={`navbar-desktop-tag-${tag.name}`}
              className="group flex items-center px-3 py-2 text-base leading-5 font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition ease-in-out duration-150"
            >
              <span
                className={`w-2.5 h-2.5 mr-4 rounded-full ${tag.color}`}
              ></span>
              <span className="truncate">{capitalize(tag.name)}</span>
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}
