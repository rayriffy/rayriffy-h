import React from 'react'

import { Bookmark, Clock, Cog, Home } from '@rayriffy-h/icons'
import { tags } from '@rayriffy-h/datasource'

import { capitalize } from 'lodash'

export const DesktopNavbar: React.FC = props => {
  return (
    <nav className="px-3 mt-6">
      <div className="space-y-1">
        <a
          href="#"
          className="group flex items-center px-2 py-2 text-sm leading-5 font-medium rounded-md text-gray-900 bg-gray-200 focus:outline-none focus:bg-gray-50 transition ease-in-out duration-150"
        >
          <Home className="mr-3 h-6 w-6 text-gray-500 group-hover:text-gray-500 group-focus:text-gray-600 transition ease-in-out duration-150" />
          Home
        </a>

        <a
          href="#"
          className="group flex items-center px-2 py-2 text-sm leading-5 font-medium rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition ease-in-out duration-150"
        >
          <Bookmark className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-600 transition ease-in-out duration-150" />
          Collection
        </a>

        <a
          href="#"
          className="group flex items-center px-2 py-2 text-sm leading-5 font-medium rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition ease-in-out duration-150"
        >
          <Clock className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-600 transition ease-in-out duration-150" />
          History
        </a>

        <a
          href="#"
          className="group flex items-center px-2 py-2 text-sm leading-5 font-medium rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition ease-in-out duration-150"
        >
          <Cog className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-600 transition ease-in-out duration-150" />
          Settings
        </a>
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
              className="group flex items-center px-3 py-2 text-sm leading-5 font-medium text-gray-700 rounded-md hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition ease-in-out duration-150"
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
