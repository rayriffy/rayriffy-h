import React from 'react'

import { NextPage } from 'next'
import { useRouter } from 'next/router'

import { MainListing } from '../../modules/main/components/listing'
import { HeadTitle } from '../../core/components/headTitle'

const Page: NextPage = props => {
  const router = useRouter()

  return (
    <React.Fragment>
      <HeadTitle />
      <MainListing page={Number(router.query.page as string)} />
    </React.Fragment>
  )
}

export default Page
