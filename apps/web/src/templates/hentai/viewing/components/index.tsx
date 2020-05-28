import React, { useEffect } from 'react'

import { Reader } from '../../../../core/components/reader'

import { useStoreon } from '../../../../store'
import { Store, Event } from '../../../../store/storeon'

import { Props } from '../@types/Props'

const Page: React.FC<Props> = props => {
  const { raw } = props.pageContext

  const { dispatch } = useStoreon<Store, Event>('subtitle')

  useEffect(() => {
    dispatch('subtitle/setSubtitle', 'viewing')
  }, [])

  return <Reader raw={raw} />
}

export default Page
