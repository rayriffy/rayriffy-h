import React, { useEffect, useState } from 'react'

import { Box, Flex, theme, useColorMode } from '@chakra-ui/core'
import styled from '@emotion/styled'

import Link from '../../core/components/transparentLink'

interface IProps {
  max: number
  current: number
  prefix: string
}

interface IPage {
  start: number
  index: number
  current: number
  colorMode: 'light' | 'dark' | undefined
}

const TransparentLink = styled(Link)<IPage>`
  text-decoration: none;

  ${(props: IPage) => {
    const { start, index, current, colorMode } = props

    const themeColor: any = theme.colors

    if (start + index + 1 === current) {
      return `color: ${
        colorMode === 'dark' ? themeColor.white : themeColor.black
      };`
    } else {
      return `color: ${themeColor.gray[500]};`
    }
  }}
`

const PaginationComponent: React.FC<IProps> = props => {
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

export default React.memo(PaginationComponent)
