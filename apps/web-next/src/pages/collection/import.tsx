import React, { useState } from 'react'

import { NextPage } from 'next'
import Link from 'next/link'

import { CollectionStore, useStoreon } from '@rayriffy-h/state-engine'
import { Check } from '@rayriffy-h/icons'

import { Step } from '../../core/components/step'
import { HeadTitle } from '../../core/components/headTitle'

const Page: NextPage = props => {
  const { collection, dispatch } = useStoreon('collection')

  const [input, setInput] = useState<string>('')
  const [error, setError] = useState<Error | null>(null)
  const [status, setStatus] = useState<number>(0)

  const importHandler = async (input: string) => {
    try {
      setError(null)
      setStatus(1)

      const res: CollectionStore['collection'] = await fetch(
        `https://bytebin.lucko.me/${input}`
      ).then(o => o.json())

      if (
        typeof res === 'object' &&
        typeof res.version === 'number' &&
        typeof res.data === 'object' &&
        res.data.length !== undefined
      ) {
        if (res.version === collection.version) {
          dispatch('collection/override', {
            collection: {
              ...collection,
              data: res.data,
            },
          })

          setStatus(2)
        } else {
          setError(
            new Error(
              'Mismatch version! Please make sure that both of device is running on latest version before exporting.'
            )
          )
        }
      } else {
        setError(
          new Error(
            'Invalid data format, are you sure that you are using correct transfer key?'
          )
        )
      }
    } catch (e) {
      setError(
        new Error(
          'Failed to import data. This might happen because transfer key is not found/expired or failure during import process. Please recheck transfer key, then wait for a few minutes and try again. Sorry... (*_ _)人'
        )
      )
      setStatus(0)
    }
  }

  return (
    <React.Fragment>
      <HeadTitle />
      <div className="max-w-7xl mx-auto px-0 sm:px-4 lg:px-6 pt-6">
        <div className="max-w-3xl mx-auto space-y-6">
          <Step current={status + 1} total={3} />
          <div className="bg-white overflow-hidden shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="pb-5 border-b border-gray-200 space-y-2">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Import
                </h3>
                <p className="max-w-4xl text-sm leading-5 text-gray-500">
                  {error === null
                    ? 'With this feature, you can import collection from another device by using temporary transfer key. Keep in mind that all of the current collection will be replaced with imported collection.'
                    : error.message}
                </p>
              </div>
              <div className="pt-4">
                {status === 0 ? (
                  <React.Fragment>
                    <div className="pb-4">
                      <label
                        htmlFor="transfer"
                        className="block text-sm font-medium leading-5 text-gray-700"
                      >
                        Transfer key
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <input
                          id="transfer"
                          className="form-input block w-full sm:text-sm sm:leading-5"
                          placeholder="Type your key here"
                          aria-describedby="transfer-description"
                          value={input}
                          onChange={({ target: { value } }) => {
                            setInput(value)
                          }}
                        />
                      </div>
                      <p
                        className="mt-2 text-sm text-gray-500"
                        id="transfer-description"
                      >
                        You can obtain transfer key by <b>export</b> it.
                      </p>
                    </div>
                    <div className="">
                      <span className="inline-flex rounded-md shadow-sm mr-4">
                        <Link href="/collection">
                          <a>
                            <button
                              type="button"
                              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150"
                            >
                              Back
                            </button>
                          </a>
                        </Link>
                      </span>
                      <span className="inline-flex rounded-md shadow-sm">
                        <button
                          type="button"
                          onClick={() => importHandler(input)}
                          disabled={input === ''}
                          className={`${
                            input === ''
                              ? 'bg-blue-400 hover:bg-blue-300 focus:border-blue-500 active:bg-blue-500'
                              : 'bg-blue-600 hover:bg-blue-500 focus:border-blue-700 active:bg-blue-700'
                          } inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white focus:outline-none focus:shadow-outline-blue transition ease-in-out duration-150`}
                        >
                          {input === '' ? 'Missing input' : 'Import'}
                        </button>
                      </span>
                    </div>
                  </React.Fragment>
                ) : status === 1 ? (
                  <div className="pt-4 pb-2">
                    <div className="flex justify-center">
                      <div className="w-8 h-8 spinner border-2" />
                    </div>
                    <div className="pt-2">
                      <p className="font-bold text-lg text-gray-800 text-center">
                        In progress...
                      </p>
                      <p className="text-sm text-gray-800 text-center">
                        Importing and processing data from server
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="pt-4 pb-2">
                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                      <Check className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="pt-2">
                      <p className="font-bold text-lg text-gray-800 text-center">
                        Completed!
                      </p>
                      <p className="text-sm text-gray-800 text-center">
                        Data has been transfered to this device
                      </p>
                    </div>
                    <div className="flex justify-center pt-4">
                      <span className="inline-flex rounded-md shadow-sm">
                        <Link href="/collection">
                          <a>
                            <button
                              type="button"
                              className="inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition ease-in-out duration-150"
                            >
                              Back
                            </button>
                          </a>
                        </Link>
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Page
