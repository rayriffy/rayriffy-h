import React, { useContext, useEffect } from 'react'

import { Box } from 'rebass'

import Reader from '../../../../core/components/reader'

import { Subtitle } from '../../../../app/context'

import { IProps } from '../@types/IProps'

const HentaiViewingComponent: React.FC<IProps> = props => {
  const {raw} = props.pageContext

  const [, setSubtitle] = useContext(Subtitle)

  useEffect(() => {
    setSubtitle(`viewing`)
  }, [])

  return (
    <Box>
      <Reader raw={raw} />
    </Box>
  )
}

export default HentaiViewingComponent
