import React, { useEffect } from 'react'

import { Helmet } from 'react-helmet'

import { Search } from '../../../core/components/search'

import { useStoreon } from '../../../store'

import { Props } from '../@types/Props'

const Page: React.FC<Props> = props => {
  const { raw, skip } = props.pageContext

  const { dispatch } = useStoreon('subtitle')

  useEffect(() => {
    dispatch('subtitle/setSubtitle', 'search')
  }, [])

  return (
    <React.Fragment>
      <Helmet title="Search" />
      <Search
        skip={skip}
        target="search"
        raw={raw.map(o => ({
          raw: o,
          internal: true,
        }))}
      />
    </React.Fragment>
  )
}

export default Page
