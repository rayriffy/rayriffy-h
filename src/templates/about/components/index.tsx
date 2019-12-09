import React, { useContext, useEffect } from 'react'

import { Box } from '@chakra-ui/core'

import { Subtitle } from '../../../store'

import NotAvaliable from '../../../core/components/notAvaliable'

const AboutComponent: React.FC = () => {
  const [, setSubtitle] = useContext(Subtitle)

  useEffect(() => {
    setSubtitle(`about`)
  }, [])

  return (
    <Box pt={3}>
      <NotAvaliable />
    </Box>
  )
}

export default AboutComponent
