import React, { useState, useEffect } from 'react'

import { Helmet } from 'react-helmet'
import { navigate } from 'gatsby'

import { useStoreon } from '../store'

const Page: React.FC = props => {
  const [input, setInput] = useState('')

  const { dispatch } = useStoreon('subtitle')

  useEffect(() => {
    dispatch('subtitle/setSubtitle', 'custom')
  }, [])

  return (
    <React.Fragment>
      <Helmet title="Custom" />
      <div className="flex justify-center">
        <div className="w-full md:w-8/12 lg:w-7/12 xl:w-4/12 bg-white dark:bg-gray-800 rounded px-5 py-4 text-gray-800 dark:text-white">
          <div className="text-2xl font-semibold pb-1">Custom</div>
          <div className="text-sm text-gray-600 dark:text-gray-400 pb-2">
            You can navigate into your faviorite hentai by type 6 digit number
            below or type URL{' '}
            <b className="text-gray-700 dark:text-gray-300">
              h.rayriffy.com/g/:id
            </b>
          </div>
          <div className="py-4">
            <input
              className="bg-white dark:bg-gray-900 focus:outline-none focus:shadow-outline border border-gray-300 dark:border-gray-600 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
              type="tel"
              placeholder="000000"
              value={input}
              onChange={e => {
                const value = e.target.value
                const test = /^[0-9\b]+$/

                if (value === '' || test.test(value)) setInput(value)
              }}
            />
          </div>
          <div className="py-2">
            <div
              className={`${
                input.length !== 0 && input.length <= 6
                  ? 'bg-blue-500 hover:bg-blue-700 cursor-pointer text-white'
                  : 'bg-gray-500 hover:bg-gray-700 cursor-not-allowed text-white dark:text-gray-800'
              } font-bold py-2 px-4 rounded cursor-pointer flex justify-center items-center transition-all duration-200 select-none`}
              onClick={() => {
                if (input.length !== 0 && input.length <= 6)
                  navigate(`/g/${input}`)
              }}
            >
              {input.length === 0
                ? 'Missing input'
                : input.length > 6
                ? 'Too long!'
                : 'Go'}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Page
