import React from 'react'

import { NextPage } from 'next'

import { MainListing } from '../modules/main/components/listing'

const Page: NextPage = props => {
  return <MainListing page={1} />
}

export default Page
