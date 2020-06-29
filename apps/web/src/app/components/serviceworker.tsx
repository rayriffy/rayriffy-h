import React from 'react'

export const ServiceWorker: React.FC = () => {
  return (
    <div className="text-center">
      <div
        id="sw-update-found"
        className="p-2 bg-blue-800 items-center text-blue-100 leading-none rounded-full mb-4 hidden"
        role="alert"
      >
        <span className="flex rounded-full bg-blue-500 uppercase px-2 py-1 text-xs font-bold mr-3">
          New
        </span>
        <span className="font-semibold mr-2 text-left flex-auto">
          Updating application...
        </span>
      </div>
      <div
        id="sw-update-green"
        className="p-2 bg-green-800 items-center text-green-100 leading-none rounded-full mb-4 hidden"
        role="alert"
      >
        <span className="flex rounded-full bg-green-500 uppercase px-2 py-1 text-xs font-bold mr-3">
          New
        </span>
        <span
          id="sw-update-complete"
          className="font-semibold mr-2 text-left flex-auto hidden"
        >
          Update complete! Reload required.
        </span>
        <span
          id="sw-update-installed"
          className="font-semibold mr-2 text-left flex-auto hidden"
        >
          Ready to work offline!
        </span>
      </div>
    </div>
  )
}
