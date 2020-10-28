import React from 'react'

import { NextPage } from 'next'

import { SafeMode } from '../modules/settings/components/safeMode'

const Page: NextPage = props => {
  return (
    <div className="max-w-7xl mx-auto px-0 sm:px-4 lg:px-6 pt-6">
      <div className="max-w-3xl mx-auto">
        <SafeMode />
      </div>
    </div>
  )
}

export default Page
