import React, { useMemo, useState } from 'react'

import { NextPage } from 'next'
import { useRouter } from 'next/router'

const Page: NextPage = props => {
  const router = useRouter()

  const [input, setInput] = useState('')
  const isDisabled = useMemo(() => input.length === 0 || input.length > 6, [
    input,
  ])

  return (
    <div className="max-w-2xl mx-auto px-0 sm:px-4 lg:px-6 pt-6">
      <div className="max-w-3xl mx-auto space-y-6 pb-8">
        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h1 className="text-lg leading-6 font-medium text-gray-900">
              Custom
            </h1>
            <p className="text-gray-500 pt-2 text-sm">
              You can navigate into your faviorite hentai by type 6 digit number
              below or type URL{' '}
              <b className="text-gray-700">h.rayriffy.com/g/:id</b>
            </p>
            <div className="py-4">
              <label htmlFor="code" className="sr-only">
                Code
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  id="code"
                  className="form-input block w-full sm:text-sm sm:leading-5 font-mono"
                  type="tel"
                  placeholder="000000"
                  value={input}
                  onChange={({ target: { value } }) => {
                    setInput(value)
                  }}
                />
              </div>
            </div>
            <div className="flex justify-center">
              <span className="inline-flex rounded-md shadow-sm">
                <button
                  type="button"
                  disabled={isDisabled}
                  className={`inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white focus:outline-none transition ease-in-out duration-150 ${
                    isDisabled
                      ? 'bg-gray-600 hover:bg-gray-500 focus:border-gray-700 active:bg-gray-700 focus:shadow-outline-gray'
                      : 'bg-blue-600 hover:bg-blue-500 focus:border-blue-700 active:bg-blue-700 focus:shadow-outline-blue'
                  }`}
                  onClick={() => {
                    router.push(`/g/${input}`)
                  }}
                >
                  {input.length === 0
                    ? 'Missing input'
                    : input.length > 6
                    ? 'Too long!'
                    : 'Go'}
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page
