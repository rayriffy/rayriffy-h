import React from 'react'

import { NextPage } from 'next'

import { useStoreon } from '@rayriffy-h/state-engine'

import { Listing } from '../core/components/listing'

const Page: NextPage = props => {
  const { history } = useStoreon('history')

  return (
    <div className="p-2 sm:p-6">
      <div className="py-4 sm:py-6">
        <Listing galleries={history.items.map(o => o.data)} />
      </div>
    </div>
  )
}

export default Page
