import React, { useContext, useEffect } from 'react'

import { Box, ThemeProvider, ColorModeProvider } from '@chakra-ui/core'

import { Subtitle } from '../../../store'

import { NotAvaliable } from '../../../core/components'

const Page: React.FC = () => {
  const { 1: setSubtitle } = useContext(Subtitle)

  useEffect(() => {
    setSubtitle(`about`)
  }, [])

  return (
    <ThemeProvider>
      <ColorModeProvider>
        <Box pt={3}>
          <NotAvaliable />
        </Box>
      </ColorModeProvider>
    </ThemeProvider>
  )
}

export default Page
