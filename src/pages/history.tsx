import { Fragment } from 'react'

import { NextPage } from 'next'

import { Listing } from '../core/components/listing'
import { HeadTitle } from '../core/components/headTitle'
import { useStoreon } from '../context'
import { hentaiToMinifiedHentaiForListing } from '../core/services/hentaiToMinifiedHentaiForListing'

const Page: NextPage = props => {
  const { history } = useStoreon('history')

  return (
    <Fragment>
      <HeadTitle />
      <div className="p-2 sm:p-4">
        <div className="py-4">
          <Listing
            galleries={history.items.map(o =>
              hentaiToMinifiedHentaiForListing(o.data)
            )}
          />
        </div>
      </div>
    </Fragment>
  )
}

export default Page
