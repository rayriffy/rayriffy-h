import { Fragment, useState } from 'react'

import { NextPage } from 'next'
import Link from 'next/link'

import { CollectionStore, useStoreon } from '@rayriffy-h/state-engine'
import { CheckIcon } from '@heroicons/react/outline'
import { APIResponse } from '@rayriffy-h/helper'

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

      const res: APIResponse<CollectionStore['collection']> = await fetch(
        `/api/collection/import/${input}`
      ).then(o => o.json())

      const remoteCollection = res.response.data

      if (remoteCollection.version === collection.version) {
        dispatch('collection/override', {
          collection: {
            ...collection,
            data: remoteCollection.data,
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
    <Fragment>
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
                  <Fragment>
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
                          name="transfer"
                          type="text"
                          className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
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
                              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
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
                              ? 'bg-blue-400 hover:bg-blue-500 focus:ring-blue-300'
                              : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
                          } inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2`}
                        >
                          {input === '' ? 'Missing input' : 'Import'}
                        </button>
                      </span>
                    </div>
                  </Fragment>
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
                      <CheckIcon className="h-6 w-6 text-green-600" />
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
                              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
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
    </Fragment>
  )
}

export default Page
