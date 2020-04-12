import React, { useState } from 'react'

import {
  Box,
  Collapse as ChakraCollapse,
  Text,
  useColorMode,
} from '@chakra-ui/core'

import { headingFontColor } from '../heading'

import { ReaderCollapseProps } from '../../@types'

export const Collapse: React.FC<ReaderCollapseProps> = props => {
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
      <ChakraCollapse isOpen={isShow}>{children}</ChakraCollapse>
    </React.Fragment>
  )
}
