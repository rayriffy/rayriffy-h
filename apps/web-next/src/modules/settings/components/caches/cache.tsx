import React from 'react'

import { useCache } from '../../services/useCache'

interface IProps {
  cacheName: string
  icon: React.FC<React.SVGProps<SVGSVGElement>>
  title: string
}

export const Cache: React.FC<IProps> = React.memo(props => {
  const nextImages = useCache(props.cacheName)

  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
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
          <button className="font-medium text-red-600 hover:red-blue-500 transition ease-in-out duration-150">
            Clear all
          </button>
        </div>
      </div>
    </div>
  )
})
