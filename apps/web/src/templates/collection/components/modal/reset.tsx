import React, { useEffect, useState } from 'react'

import { useStoreon } from '../../../../store'

import { ModalResetProps } from '../../@types/ModalResetProps'

export const ModalReset: React.FC<ModalResetProps> = props => {
  const { onClose } = props

  const { dispatch, collection } = useStoreon('collection')

  const [lock, setLock] = useState<boolean>(true)

  useEffect(() => {
    setTimeout(() => {
      setLock(false)
    }, 3000)
  }, [])

  const closeToggle = () => (onClose ? onClose() : null)

  const resetHandler = () => {
    dispatch('collection/override', {
      collection: {
        ...collection,
        data: [],
      },
    })

    closeToggle()
  }

  return (
    <React.Fragment>
      <div className="text-sm text-gray-600 dark:text-gray-400 pb-2">
        This will empty your saved collections and this process cannot be
        undone! Are you sure to do this?
      </div>
      <div className="pt-4 pb-2 flex justify-end flex-wrap">
        <button
          className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-4 transition-all duration-200 select-none"
          onClick={closeToggle}
        >
          No, abort!
        </button>
        <button
          className={`${
            !lock
              ? 'bg-red-500 hover:bg-red-700 cursor-pointer text-white'
              : 'bg-gray-500 hover:bg-gray-700 cursor-not-allowed text-white dark:text-gray-800'
          } font-bold py-2 px-4 rounded transition-all duration-200 select-none`}
          onClick={() => (!lock ? resetHandler() : null)}
        >
          Yes, do it!
        </button>
      </div>
    </React.Fragment>
  )
}
