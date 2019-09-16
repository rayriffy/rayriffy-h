import React from 'react'

import { Box, Flex, Text } from 'rebass'
import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  html {
    background-color: rgb(245, 245, 245);
  }

  // @media (prefers-color-scheme: dark) {
  //   html {
  //     background-color: rgb(40, 40, 40);
  //   }
  // }
`

const AppComponent: React.FC = props => {
  const {children} = props

  return (
    <Box pt={5}>
      <GlobalStyle />
      <Box px={[3, 4, 5]}>
        <Flex alignItems={`flex-end`} flexWrap={`wrap`}>
          <Text fontSize={42} fontWeight={700}>Riffy H</Text>
          <Text fontSize={30} fontWeight={600} color={`rgba(0, 0, 0, 0.45)`} px={2} pb={2}>subtitle</Text>
        </Flex>
      </Box>
      <Box>
        {children}
      </Box>
    </Box>
  )
}

export default AppComponent
