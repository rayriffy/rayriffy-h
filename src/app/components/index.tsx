import React from 'react'

import Helmet from 'react-helmet'

import { Box, Flex, Text } from 'rebass'
import { createGlobalStyle } from 'styled-components'

import Divider from '../../core/components/divider'

import Drawer from '../components/drawer'

const GlobalStyle = createGlobalStyle`
  html {
    background-color: rgb(245, 245, 245);
  }
`

const AppComponent: React.FC = props => {
  const {children} = props

  return (
    <Box pt={5}>
      <GlobalStyle />
      <Helmet defaultTitle={`Riffy H`} />
      <Box px={[3, 4, 5]}>
        <Flex alignItems={`center`}>
          <Flex alignItems={`flex-end`} flexWrap={`wrap`}>
            <Text fontSize={42} fontWeight={700}>Riffy H</Text>
            <Text fontSize={30} fontWeight={600} color={`rgba(0, 0, 0, 0.45)`} px={2} pb={2}>subtitle</Text>
          </Flex>
          <Box mx={`auto`} />
          <Box px={3}>
            <Drawer />
          </Box>
        </Flex>
        <Divider py={1} />
      </Box>
      <Box>
        {children}
      </Box>
    </Box>
  )
}

export default AppComponent
