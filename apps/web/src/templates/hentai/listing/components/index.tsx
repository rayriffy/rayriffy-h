import React, { useEffect } from 'react'

import { Helmet } from 'react-helmet'

import { Listing } from '../../../../core/components/listing'
import { Pagination } from '../../../../core/components/pagination'

import { useStoreon } from '../../../../store'

import { Props } from '../@types/Props'

const Page: React.FC<Props> = props => {
  const { pageContext } = props
  const { raw, page } = pageContext

  const { dispatch } = useStoreon('subtitle')

  useEffect(() => {
    dispatch('subtitle/setSubtitle', 'listing')
  }, [])

  return (
    <React.Fragment>
      <Helmet title="Listing" />
      <Pagination current={page.current} max={page.max} prefix="/listing/" />
      <Listing
        raw={raw.map(o => ({
          raw: o,
          internal: true,
        }))}
      />
      <Pagination current={page.current} max={page.max} prefix="/listing/" />
    </React.Fragment>
  )
}

export default Page
