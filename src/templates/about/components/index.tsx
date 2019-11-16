import React, { useContext, useEffect } from 'react'

import { Box } from 'rebass'

import { Subtitle } from '../../../app/context'

const AboutComponent: React.FC = () => {
  const [, setSubtitle] = useContext(Subtitle)

  useEffect(() => {
    setSubtitle(`about`)
  }, [])

  return <Box>OK</Box>
}

export default AboutComponent
