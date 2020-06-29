import React from 'react'

const Component: React.FC = () => {
  return (
    <div className="flex justify-center">
      <div className="w-full md:w-8/12 lg:4/12 bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
        <video
          src="https://media.tenor.com/videos/e6351e1875131b10e6b2f106360ed5a5/mp4"
          loop
          autoPlay
          className="w-full h-auto rounded-t-lg"
        />
        <div className="p-6">
          <div className="text-gray-900 dark:text-white text-2xl font-semibold">
            Failed
          </div>
          <div className="text-gray-900 dark:text-white text-md pt-1">
            I cannot find your hentai for this time (may be it's not exist)
          </div>
          <div className="text-gray-900 dark:text-white text-md">
            Sorry... (*_ _)人
          </div>
        </div>
      </div>
    </div>
  )
}

export const Failed = React.memo(Component)
