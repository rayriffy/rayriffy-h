import React, { useEffect, useState } from 'react'

import { useStoreon } from '../../store'

export const CollectionMigration: React.FC = props => {
  const [active, setActive] = useState<'none' | string>('none')
  const { dispatch } = useStoreon('collection')

  useEffect(() => {
    const collectionV1 = window.localStorage.getItem('collection')

    // V1-V2
    if (collectionV1 !== null && JSON.parse(collectionV1).version === 1) {
      setActive('migrate-ongoing')
      dispatch('collection/override', {
        collection: {
          version: 2,
          data: JSON.parse(collectionV1).data,
        },
      })
      window.localStorage.removeItem('collection')
      setActive('migrate-done')
      setTimeout(() => setActive('none'), 5000)
    }
  }, [])

  return active === 'migrate-ongoing' ? (
    <div
      className="p-2 bg-blue-800 items-center text-blue-100 leading-none rounded-full mb-4 flex"
      role="alert"
    >
      <span className="flex rounded-full bg-blue-500 uppercase px-2 py-1 text-xs font-bold mr-3">
        New
      </span>
      <span className="font-semibold mr-2 text-left flex-auto">
        Collection migration in progress
      </span>
    </div>
  ) : active === 'migrate-done' ? (
    <div
      className="p-2 bg-green-800 items-center text-green-100 leading-none rounded-full mb-4 flex"
      role="alert"
    >
      <span className="flex rounded-full bg-green-500 uppercase px-2 py-1 text-xs font-bold mr-3">
        New
      </span>
      <span className="font-semibold mr-2 text-left flex-auto">
        Migration successful!
      </span>
    </div>
  ) : null
}
