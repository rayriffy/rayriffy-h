import React, { useContext, useEffect } from 'react'

import { Pagination } from '../../../../core/components/pagination'
import { Listing } from '../../../../core/components/listing'

import { Subtitle } from '../../../../store'

import { Props } from '../@types/Props'

const Page: React.FC<Props> = props => {
  const { raw, page, tag, prefix, subtitle } = props.pageContext

  const [, setSubtitle] = useContext(Subtitle)

  useEffect(() => {
    setSubtitle(`${subtitle}`)
  }, [])

  return (
    <React.Fragment>
      <Pagination
        current={page.current}
        max={page.max}
        prefix={`/${prefix}/${tag.id}/`}
      />
      <Listing raw={raw} />
      <Pagination
        current={page.current}
        max={page.max}
        prefix={`/${prefix}/${tag.id}/`}
      />
    </React.Fragment>
  )
}

export default Page
