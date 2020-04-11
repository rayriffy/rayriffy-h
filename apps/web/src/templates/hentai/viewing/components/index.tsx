import React, { useContext, useEffect } from 'react'

import { ThemeProvider, ColorModeProvider } from '@chakra-ui/core'

import { Reader } from '../../../../core/components'

import { Subtitle } from '../../../../store'

import { IProps } from '../@types/IProps'

const Page: React.FC<IProps> = props => {
  const { raw } = props.pageContext

  const { 1: setSubtitle } = useContext(Subtitle)

  useEffect(() => {
    setSubtitle(`viewing`)
  }, [])

  return (
    <ThemeProvider>
      <ColorModeProvider>
        <Reader raw={raw} />
      </ColorModeProvider>
    </ThemeProvider>)
}

export default Page
