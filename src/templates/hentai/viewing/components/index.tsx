import React, { useContext, useEffect } from 'react'

import Reader from '../../../../core/components/reader'

import { Subtitle } from '../../../../store'

import { IProps } from '../@types/IProps'

const HentaiViewingComponent: React.FC<IProps> = props => {
  const { raw } = props.pageContext

  const [, setSubtitle] = useContext(Subtitle)

  useEffect(() => {
    setSubtitle(`viewing`)
  }, [])

  return <Reader raw={raw} />
}

export default HentaiViewingComponent
