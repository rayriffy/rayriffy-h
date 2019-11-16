import React from 'react'

import { Helmet } from 'react-helmet'

import { Box } from 'rebass'
import { createGlobalStyle } from 'styled-components'

import Header from './header'

import Context from '../context'

const GlobalStyle = createGlobalStyle`
  html {
    background-color: rgb(245, 245, 245);
  }
`

const AppComponent: React.FC = props => {
  const { children } = props

  return (
    <Context>
      <Box pt={5}>
        <GlobalStyle />
        <Helmet defaultTitle={`Riffy H`} titleTemplate={`%s · Riffy H`} />
        <Box px={[3, 4, 5]}>
          <Header />
        </Box>
        <Box>{children}</Box>
      </Box>
    </Context>
  )
}

export default AppComponent
