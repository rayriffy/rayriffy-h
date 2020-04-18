import React from 'react'

import { Box, Flex, Link, useColorMode } from '@chakra-ui/core'
import { styled } from '../../../core/theme/styled'

interface Props {
  max: number
  current: number
  onChange(page: number): void
}

interface Page {
  start: number
  index: number
  current: number
  colorMode: 'light' | 'dark' | undefined
}

const StyledLink = styled(Link)<Page>(props => {
  const { start, index, current, colorMode, theme } = props

  return {
    textDecoration: 'none',
    color: start + index + 1 === current ? colorMode === 'dark' ? theme.colors.white : theme.colors.black : theme.colors.gray[500]
  }
})

const Component: React.FC<Props> = props => {
  const { max, current, onChange } = props

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

  return (
    <Flex justifyContent='center'>
      {Array.from({ length: pageLength }, (_, i) => (
        <Box key={`pagination-${startPoint + i}`} px={3}>
          <StyledLink
            href={'#'}
            _hover={{ textDecoration: 'none' }}
            start={startPoint}
            index={i}
            current={current}
            colorMode={colorMode}
            aria-label={`${startPoint + i + 1}`}
            onClick={() => onChange(startPoint + i + 1)}>
            {startPoint + i + 1}
          </StyledLink>
        </Box>
      ))}
    </Flex>
  )
}

export const Pagination = React.memo(Component)
