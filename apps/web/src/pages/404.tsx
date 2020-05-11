import React, { useContext, useEffect } from 'react'

import { Subtitle } from '../store'

export default () => {
  const [, setSubtitle] = useContext(Subtitle)

  useEffect(() => {
    setSubtitle('404')
  }, [])

  return (
    <div className='flex justify-center'>
      <div className='w-full md:w-8/12 lg:4/12 bg-white dark:bg-gray-800 rounded-lg overflow-hidden'>
        <video src='https://media.tenor.com/videos/93fa0ad60fa238a9c88cf69e2d4de5c0/mp4' loop autoPlay className='w-full h-auto rounded-t-lg' />
        <div className='p-6'>
          <div className='text-gray-900 dark:text-white text-2xl font-semibold'>Not found</div>
          <div className='text-gray-900 dark:text-white text-md pt-1'>The page your're looking for is not found</div>
        </div>
      </div>
    </div>
  )
}