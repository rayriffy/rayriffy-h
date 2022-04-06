import { Fragment } from 'react'

import { NextPage } from 'next'

import { MainListing } from '../modules/main/components/listing'
import { HeadTitle } from '../core/components/headTitle'

const Page: NextPage = props => {
  return (
    <Fragment>
      <HeadTitle />
      <MainListing page={1} />
    </Fragment>
  )
}

export default Page
