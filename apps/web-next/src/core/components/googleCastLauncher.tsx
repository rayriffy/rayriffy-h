/* eslint-disable @typescript-eslint/no-namespace */

import React from 'react'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'google-cast-launcher': any
    }
  }
}

export const GoogleCastLauncher: React.FC = () => {
  return (
    <span className="inline-flex rounded-md shadow-sm">
      <button
        type="button"
        className="inline-flex items-center p-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition ease-in-out duration-150"
        // onClick={toggleFavorite}
      >
        <google-cast-launcher
          className="w-6 h-6 block text-white"
          style=""
        ></google-cast-launcher>
      </button>
    </span>
  )
}
