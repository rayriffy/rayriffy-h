import React from 'react'

import { Box } from 'rebass'

import Reader from '../../../../core/components/reader'

import { IProps } from '../@types/IProps'

const HentaiViewingComponent: React.FC<IProps> = props => {
  const {raw, tagStack} = props.pageContext

  return (
    <Box>
      <Reader raw={raw} tagStack={tagStack} />
    </Box>
  )
}

export default HentaiViewingComponent
