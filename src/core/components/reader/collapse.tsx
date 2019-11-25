import React, { useState } from 'react'

import { Box, Collapse, Text } from '@chakra-ui/core'

import { IReaderCollapseProps } from '../../@types/IReaderCollapseProps'

const ReaderCollapseComponent: React.FC<IReaderCollapseProps> = props => {
  const { defaultState = false, title, children } = props

  const [isShow, setIsShow] = useState(defaultState)

  return (
    <React.Fragment>
      <Box p={1}>
        <Text fontSize='sm' onClick={() => setIsShow(prev => !prev)}>
          {title}
        </Text>
      </Box>
      <Collapse isOpen={isShow}>{children}</Collapse>
    </React.Fragment>
  )
}

export default ReaderCollapseComponent
