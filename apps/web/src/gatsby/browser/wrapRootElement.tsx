import React from 'react'

import { GatsbyBrowser } from 'gatsby'
import { ThemeProvider } from '@chakra-ui/core'

import { Context } from '../../store'

export const wrapRootElement: GatsbyBrowser['wrapRootElement'] = ({
  element,
}) => {
  return <Context>{element}</Context>

  // return (
  //   <ThemeProvider>
  //     <Context>{element}</Context>
  //   </ThemeProvider>
  // )
}
