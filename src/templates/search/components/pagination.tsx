import React from 'react'

import { Box, Flex, Link } from 'rebass'
import styled from 'styled-components'

interface IProps {
  max: number
  current: number
  onChange(page: number): void
}

interface IPage {
  start: number
  index: number
  current: number
}

const StyledLink = styled(Link)`
  text-decoration: none;

  ${(props: IPage) => {
    const {start, index, current} = props

    if (start + index + 1 === current) {
      return `color: rgba(0, 0, 0, 1);`
    } else {
      return `color: rgba(0, 0, 0, 0.5);`
    }
  }}
`

const PaginationComponent: React.FC<IProps> = props => {
  const {max, current, onChange} = props

  const pageLength: number = max > 5 ? 5 : max
  const startPoint: number = max > 5 ? current - 2 < 1 ? 0 : current + 2 > max ? max - pageLength : current - (pageLength - 2) : 0

  return (
    <Box>
      <Flex justifyContent={`center`}>
        {Array.from({length: pageLength}, (_, i) => (
          <Box key={`pagination-${startPoint + i}`} px={3}>
            <StyledLink href={'#'} start={startPoint} index={i} current={current} onClick={() => onChange(startPoint + i + 1)}>
              {startPoint + i + 1}
            </StyledLink>
          </Box>
        ))}
      </Flex>
    </Box>
  )
}

export default React.memo(PaginationComponent)
