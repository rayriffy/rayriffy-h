import React, { useEffect } from 'react'

import { upperFirst } from 'lodash-es'
import { Helmet } from 'react-helmet'

import { Pagination } from '../../../../core/components/pagination'
import { Listing } from '../../../../core/components/listing'

import { useStoreon } from '../../../../store'

import { Props } from '../@types/Props'

const Page: React.FC<Props> = props => {
  const { raw, page, tag, prefix, subtitle } = props.pageContext

  const { dispatch } = useStoreon('subtitle')

  useEffect(() => {
    dispatch('subtitle/setSubtitle', subtitle)
  }, [])

  return (
    <React.Fragment>
      <Helmet
        title={subtitle
          .split('/')
          .map(o => upperFirst(o))
          .join(' · ')}
      />
      <Pagination
        current={page.current}
        max={page.max}
        prefix={`/${prefix}/${tag.id}/`}
      />
      <Listing
        raw={raw.map(o => ({
          raw: o,
          internal: true,
        }))}
      />
      <Pagination
        current={page.current}
        max={page.max}
        prefix={`/${prefix}/${tag.id}/`}
      />
    </React.Fragment>
  )
}

export default Page
