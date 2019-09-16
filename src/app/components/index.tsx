import React from 'react'

import { Box, Flex } from 'rebass'
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
    <>
      <GlobalStyle />
      <Box>
        {children}
      </Box>
    </>
  )
}

export default AppComponent
