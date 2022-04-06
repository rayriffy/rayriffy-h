import { Fragment } from 'react'

import { NextPage } from 'next'
import { useRouter } from 'next/router'

import { MainListing } from '../../modules/main/components/listing'
import { HeadTitle } from '../../core/components/headTitle'

const Page: NextPage = props => {
  const router = useRouter()

  return (
    <Fragment>
      <HeadTitle />
      <MainListing page={Number(router.query.page as string)} />
    </Fragment>
  )
}

export default Page
