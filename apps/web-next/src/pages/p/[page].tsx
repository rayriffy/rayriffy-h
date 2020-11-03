import React from 'react'

import { NextPage } from 'next'
import { useRouter } from 'next/router'

import { MainListing } from '../../modules/main/components/listing'

const Page: NextPage = props => {
  const router = useRouter()

  return <MainListing page={Number(router.query.page as string)} />
}

export default Page
