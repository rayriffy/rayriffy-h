import React, { useContext, useEffect } from 'react'

import { Box } from 'rebass'

import Reader from '../../../../core/components/reader'

import { Subtitle } from '../../../../app/context'

import { IProps } from '../@types/IProps'

const HentaiViewingComponent: React.FC<IProps> = props => {
  const {raw, tagStack} = props.pageContext

  const [, setSubtitle] = useContext(Subtitle)

  useEffect(() => {
    if (setSubtitle) {
      setSubtitle(`viewing`)
    }
  }, [])

  return (
    <Box>
      <Reader raw={raw} tagStack={tagStack} />
    </Box>
  )
}

export default HentaiViewingComponent
