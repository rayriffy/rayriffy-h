import React, { useEffect } from 'react'

import { Helmet } from 'react-helmet'

import { Listing } from '../../../../core/components/listing'
import { Pagination } from '../../../../core/components/pagination'

import { useStoreon } from 'storeon/react'
import { Store, Event } from '../../../../store/storeon'

import { Props } from '../@types/Props'

const Page: React.FC<Props> = props => {
  const { pageContext } = props
  const { raw, page } = pageContext

  const { dispatch } = useStoreon<Store, Event>('subtitle')

  useEffect(() => {
    dispatch('subtitle/setSubtitle', 'listing')
  }, [])

  return (
    <React.Fragment>
      <Helmet title='Listing' />
      <Pagination
        current={page.current}
        max={page.max}
        prefix='/listing/'
      />
      <Listing
        raw={raw.map(o => ({
          raw: o,
          internal: true,
        }))} />
      <Pagination
        current={page.current}
        max={page.max}
        prefix='/listing/'
      />
    </React.Fragment>
  )
}

export default Page
