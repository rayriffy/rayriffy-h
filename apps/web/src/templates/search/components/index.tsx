import React, { useContext, useEffect } from 'react'

import { Helmet } from 'react-helmet'

import { Search } from '../../../core/components/search'

import { Subtitle } from '../../../store'

import { Props } from '../@types/Props'

const Page: React.FC<Props> = props => {
  const { raw, skip } = props.pageContext

  const { 1: setSubtitle } = useContext(Subtitle)

  useEffect(() => {
    setSubtitle(`search`)
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
