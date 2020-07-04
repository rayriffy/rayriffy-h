import React, { useEffect } from 'react'

import { Helmet } from 'react-helmet'

import { useStoreon } from '../../../store'

import { Listing } from '../../../core/components/listing'

const Component: React.FC = props => {
  const { dispatch, history } = useStoreon('subtitle', 'history')

  useEffect(() => {
    dispatch('subtitle/setSubtitle', 'history')
  }, [])

  return (
    <React.Fragment>
      <Helmet title="History" />
      {history.items.length === 0 ? (
        <div className="pt-12 text-center">
          <div className="text-xl font-semibold text-gray-900 dark:text-white">
            History is empty!
          </div>
          <div className="text-gray-600 dark:text-gray-500">
            Go see some gallery! The last 15 gallery you visit will show up
            here.
          </div>
        </div>
      ) : (
        <Listing
          raw={history.items.map(o => ({ internal: o.internal, raw: o.data }))}
        />
      )}
    </React.Fragment>
  )
}

export const History = React.memo(Component)
