import React, { useContext, useEffect } from 'react'

import { Listing } from '../../../../core/components/listing'
import { Pagination } from '../../../../core/components/pagination'

import { Subtitle } from '../../../../store'

import { Props } from '../@types/Props'

const Page: React.FC<Props> = props => {
  const { pageContext } = props
  const { raw, page } = pageContext

  const [, setSubtitle] = useContext(Subtitle)

  useEffect(() => {
    setSubtitle(`listing`)
  }, [])

  return (
    <React.Fragment>
      <Pagination
        current={page.current}
        max={page.max}
        prefix='/listing/'
      />
      <Listing raw={raw} />
      <Pagination
        current={page.current}
        max={page.max}
        prefix='/listing/'
      />
    </React.Fragment>
  )
}

export default Page
