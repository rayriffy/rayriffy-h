import React from 'react'

import { NextPage } from 'next'

import { useStoreon } from '@rayriffy-h/state-engine'

import { Listing } from '../core/components/listing'

const Page: NextPage = props => {
  const { history } = useStoreon('history')

  return (
    <div className="p-2 sm:p-4">
      <div className="py-4">
        <Listing galleries={history.items.map(o => o.data)} />
      </div>
    </div>
  )
}

export default Page
