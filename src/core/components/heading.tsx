import React, { useEffect, useState } from 'react'

import {
  Heading as ChakraHeading,
  HeadingProps,
  useColorMode,
} from '@chakra-ui/core'

export const headingFontColor = {
  light: 'blackAlpha.800',
  dark: 'whiteAlpha.800',
}

const Heading: React.FC<HeadingProps> = React.forwardRef((props, ref) => {
  const { colorMode } = useColorMode()

  const { 0: color, 1: setColor } = useState<string | undefined>(undefined)

  useEffect(() => {
    setColor(colorMode ? headingFontColor[colorMode] : undefined)
  }, [colorMode])

  return <ChakraHeading ref={ref} color={color} {...props} />
})

export default Heading
