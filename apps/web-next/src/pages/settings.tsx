import { Fragment } from 'react'

import { NextPage } from 'next'

import { SafeMode } from '../modules/settings/components/safeMode'
import { ClearHistory } from '../modules/settings/components/clearHistory'
import { Stats } from '../modules/settings/components/stats'
import { Caches } from '../modules/settings/components/caches'
import { HeadTitle } from '../core/components/headTitle'

const Page: NextPage = props => {
  return (
    <Fragment>
      <HeadTitle />
      <div className="max-w-7xl mx-auto px-0 sm:px-4 lg:px-6 pt-6">
        <div className="max-w-3xl mx-auto space-y-6 pb-8">
          <Stats />
          <SafeMode />
          <ClearHistory />
          <Caches />
        </div>
      </div>
    </Fragment>
  )
}

export default Page
