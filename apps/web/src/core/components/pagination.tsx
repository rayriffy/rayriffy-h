import React, { useEffect, useState } from 'react'

import { Box, Flex, useColorMode } from '@chakra-ui/core'
import { styled } from '../theme/styled'

import { TransparentLink as Link } from './'

interface Props {
  max: number
  current: number
  prefix: string
}

interface Page {
  start: number
  index: number
  current: number
  colorMode: 'light' | 'dark' | undefined
}

const TransparentLink = styled(Link)<Page>(props => {
  const { start, index, current, colorMode, theme } = props

  return {
    textDecoration: 'none',
    color: start + index + 1 === current ? colorMode === 'dark' ? theme.colors.white : theme.colors.black : theme.colors.gray[500]
  }
})

const Component: React.FC<Props> = props => {
  const { max, current, prefix } = props

  const { 0: color, 1: setColor } = useState<'dark' | 'light' | undefined>(
    undefined
  )

  const { colorMode } = useColorMode()

  const pageLength: number = max > 5 ? 5 : max
  const startPoint: number =
    max > 5
      ? current - 2 < 1
        ? 0
        : current + 2 > max
        ? max - pageLength
        : current - (pageLength - 2)
      : 0

  useEffect(() => {
    setColor(colorMode)
  }, [colorMode])

  return (
    <Flex justifyContent='center'>
      {Array.from({ length: pageLength }, (_, i) => (
        <Box key={`pagination-${startPoint + i}`} px={3}>
          <TransparentLink
            to={
              startPoint + i === 0 ? prefix : `${prefix}p/${startPoint + i + 1}`
            }
            aria-label={`${startPoint + i + 1}`}
            start={startPoint}
            index={i}
            colorMode={color}
            current={current}>
            {startPoint + i + 1}
          </TransparentLink>
        </Box>
      ))}
    </Flex>
  )
}

export const Pagination = React.memo(Component)
