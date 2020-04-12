import React, { useContext, useEffect } from 'react'

import { Search } from '../../../core/components'

import { Subtitle } from '../../../store'

import { Props } from '../@types/Props'

const Page: React.FC<Props> = props => {
  const { pageContext } = props

  const { 1: setSubtitle } = useContext(Subtitle)

  useEffect(() => {
    setSubtitle(`search`)
  }, [])

  return <Search {...pageContext} />
}

export default Page
