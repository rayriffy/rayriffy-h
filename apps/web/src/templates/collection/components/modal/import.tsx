import React, { useState } from 'react'

import { fetch } from '@rayriffy-h/fetch'

import { useStoreon } from '../../../../store'

import { ModalImportProps } from '../../@types/ModalImportProps'

import { CollectionStore } from '../../../../store/@types/CollectionStore'

export const ModalImport: React.FC<ModalImportProps> = props => {
  const { onClose } = props

  const { dispatch, collection } = useStoreon('collection')

  const [input, setInput] = useState<string>('')
  const [status, setStatus] = useState<'wait' | 'progress'>('wait')
  const [error, setError] = useState<null | string>(null)

  const closeToggle = () => (onClose ? onClose() : null)

  const importHandler = async () => {
    try {
      setError(null)
      setStatus('progress')

      const res = await fetch<CollectionStore['collection']>(
        `https://bytebin.lucko.me/${input}`
      )

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
          closeToggle()
        } else {
          setError(
            'Mismatch version! Please make sure that both of device is running on latest version before exporting.'
          )
        }
      } else {
        setError(
          'Invalid data format, are you sure that you are using correct transfer key?'
        )
      }
    } catch (e) {
      setError(
        'Failed to import data. This might happen because transfer key is not found/expired or failure during import process. Please recheck transfer key, then wait for a few minutes and try again. Sorry... (*_ _)人'
      )
    } finally {
      setStatus('wait')
    }
  }

  return (
    <React.Fragment>
      <div className="text-sm text-gray-600 dark:text-gray-400 pb-2">
        {error !== null
          ? error
          : status === 'wait'
          ? 'With this feature, you can import collection from another device by using temporary transfer key. Keep in mind that all of the current collection will be replaced with imported collection.'
          : status === 'progress'
          ? 'Making request to server...'
          : null}
      </div>
      <div className="py-4">
        <input
          className="bg-white dark:bg-gray-900 focus:outline-none focus:shadow-outline border border-gray-300 dark:border-gray-600 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
          type="text"
          placeholder="Transfer key"
          value={input}
          onChange={e => setInput(e.target.value)}
        />
      </div>
      <div className="pt-4 pb-2 flex justify-end flex-wrap">
        <button
          className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-4 transition-all duration-200 select-none"
          onClick={closeToggle}
        >
          Cancel
        </button>
        <button
          className={`${
            input.length !== 0
              ? 'bg-blue-500 hover:bg-blue-700 cursor-pointer text-white'
              : 'bg-gray-500 hover:bg-gray-700 cursor-not-allowed text-white dark:text-gray-800'
          } font-bold py-2 px-4 rounded transition-all duration-200 select-none`}
          onClick={() =>
            input.length !== 0 && status === 'wait' ? importHandler() : null
          }
        >
          {status === 'progress'
            ? 'Importing'
            : input.length !== 0
            ? 'Import'
            : 'Missing input'}
        </button>
      </div>
    </React.Fragment>
  )
}
