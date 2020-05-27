import React, { useEffect } from 'react'

import { Helmet } from 'react-helmet'

import { Search } from '../../../core/components/search'

import { useStoreon } from 'storeon/react'
import { Store, Event } from '../../../store/storeon'

import { Props } from '../@types/Props'

const Page: React.FC<Props> = props => {
  const { raw, skip } = props.pageContext

  const { dispatch } = useStoreon<Store, Event>('subtitle')

  useEffect(() => {
    dispatch('subtitle/setSubtitle', 'search')
  }, [])

  return (
    <React.Fragment>
      <Helmet title='Search' />
      <Search
        skip={skip}
        raw={raw.map(o => ({
          raw: o,
          internal: true,
        }))} />
    </React.Fragment>
  )
}

export default Page
