import React, { useState } from 'react'

import { Box, Collapse, Text, useColorMode } from '@chakra-ui/core'

import { headingFontColor } from '../heading'

import { IReaderCollapseProps } from '../../@types/IReaderCollapseProps'

const ReaderCollapseComponent: React.FC<IReaderCollapseProps> = props => {
  const { defaultState = false, title, children } = props

  const { colorMode } = useColorMode()

  const { 0: isShow, 1: setIsShow } = useState(defaultState)

  return (
    <React.Fragment>
      <Box p={1}>
        <Text
          fontSize='sm'
          onClick={() => setIsShow(prev => !prev)}
          color={colorMode ? headingFontColor[colorMode] : undefined}>
          {title}
        </Text>
      </Box>
      <Collapse isOpen={isShow}>{children}</Collapse>
    </React.Fragment>
  )
}

export default ReaderCollapseComponent
