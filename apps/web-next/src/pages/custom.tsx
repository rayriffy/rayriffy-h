import React, { useMemo, useState } from 'react'

import { NextPage } from 'next'
import { useRouter } from 'next/router'

import { HeadTitle } from '../core/components/headTitle'

const Page: NextPage = props => {
  const router = useRouter()

  const [input, setInput] = useState('')
  const isDisabled = useMemo(() => input.length === 0 || input.length > 6, [
    input,
  ])

  return (
    <React.Fragment>
      <HeadTitle />
      <div className="max-w-2xl mx-auto px-0 sm:px-4 lg:px-6 pt-6">
        <div className="max-w-3xl mx-auto space-y-6 pb-8">
          <div className="bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h1 className="text-lg leading-6 font-medium text-gray-900">
                Custom
              </h1>
              <p className="text-gray-500 pt-2 text-sm">
                You can navigate into your faviorite hentai by type 6 digit
                number below or type URL{' '}
                <b className="text-gray-700">h.rayriffy.com/g/:id</b>
              </p>
              <div className="py-4">
                <label htmlFor="code" className="sr-only">
                  Code
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    type="tel"
                    id="code"
                    name="code"
                    placeholder="000000"
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
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
                    className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 ${isDisabled ? 'bg-gray-600 hover:bg-gray-700 focus:ring-gray-500' : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'}`}
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
    </React.Fragment>
  )
}

export default Page
