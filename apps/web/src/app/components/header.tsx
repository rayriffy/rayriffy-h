import React, { useState, useEffect } from 'react'

import { useStoreon } from '../../store'

import { Navigation } from './navigation'

import { Props } from '../@types/Props'

export const Header: React.FC<Props> = props => {
  const { path } = props

  const { subtitle } = useStoreon('subtitle')

  const [collapse, setCollapse] = useState(false)

  useEffect(() => {
    setCollapse(false)
  }, [path])

  return (
    <div className='md:flex flex-col md:flex-row md:min-h-screen md:fixed'>
      <div className='flex flex-col w-full md:w-64 text-gray-700 bg-white dark:text-gray-200 dark:bg-gray-900 md:dark:bg-gray-800'>
        <div className='px-8 py-4 flex flex-row items-center justify-between'>
          <div className='select-none'>
            <div className='text-3xl font-semibold text-gray-900 leading-tight dark:text-white focus:outline-none focus:shadow-outline'>Riffy H</div>
            <div className='-mt-1'>{subtitle}</div>
          </div>
          <button className='rounded-lg md:hidden rounded-lg focus:outline-none focus:shadow-outline' aria-label='Menu' onClick={() => setCollapse(o => !o)}>
            <svg fill='currentColor' viewBox='0 0 20 20' className='w-6 h-6'>
              {collapse ? (
                <path fillRule='evenodd' d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z' clipRule='evenodd'></path>
              ) : (
                <path fillRule='evenodd' d='M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z' clipRule='evenodd'></path>
              )}
            </svg>
          </button>
        </div>
        <Navigation collapse={collapse} subtitle={subtitle} />
      </div>
    </div>
  )
}
