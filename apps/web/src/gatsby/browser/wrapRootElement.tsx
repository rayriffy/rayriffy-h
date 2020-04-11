import React from 'react'

import { GatsbyBrowser } from 'gatsby'
import { ThemeProvider } from '@chakra-ui/core'

import { Context } from '../../store'

export const wrapRootElement: GatsbyBrowser['wrapRootElement'] = ({
  element,
}) => {
  return (
    <ThemeProvider>
      <Context>{element}</Context>
    </ThemeProvider>
  )
}
