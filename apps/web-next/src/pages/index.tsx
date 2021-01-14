import React from 'react'

import { NextPage } from 'next'

import { MainListing } from '../modules/main/components/listing'
import { HeadTitle } from '../core/components/headTitle'

const Page: NextPage = props => {
  return (
    <React.Fragment>
      <HeadTitle />
      <MainListing page={1} />
    </React.Fragment>
  )
}

export default Page
