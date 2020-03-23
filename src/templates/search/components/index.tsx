import React, { useContext, useEffect } from 'react'

import { Search } from '../../../core/components'

import { Subtitle } from '../../../store'

import { IProps } from '../@types/IProps'

const Page: React.FC<IProps> = props => {
  const { pageContext } = props

  const { 1: setSubtitle } = useContext(Subtitle)

  useEffect(() => {
    setSubtitle(`search`)
  }, [])

  return <Search {...pageContext} />
}

export default Page
