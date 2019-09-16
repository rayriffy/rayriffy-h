import React from 'react'

import { Link } from 'gatsby'

import { Box, Flex } from 'rebass'
import styled from 'styled-components'

interface IProps {
  max: number
  current: number
  prefix: string
}

interface IPage {
  start: number
  index: number
  current: number
}

const TransparentLink = styled(Link)`
  text-decoration: none;

  ${(props: IPage) => {
    const {start, index, current} = props

    if (start + index + 1 === current) {
      return `color: rgba(0, 0, 0, 1);`
    } else {
      return `color: rgba(0, 0, 0, 0.5);`
    }
  }}

  // @media (prefers-color-scheme: dark) {
  //   & {
  //     color: rgb(255, 255, 255);
  //   }
  // }
`

const PaginationComponent: React.FC<IProps> = props => {
  const {max, current, prefix} = props

  const pageLength: number = max > 5 ? 5 : max
  const startPoint: number = max > 5 ? current - 2 < 1 ? 0 : current + 2 > max ? max - pageLength : current - (pageLength - 2) : 0

  return (
    <Box>
      <Flex justifyContent={`center`}>
        {Array.from({length: pageLength}, (_, i) => (
          <Box key={`pagination-${startPoint + i}`} px={3}>
            <TransparentLink to={`${startPoint + i === 0 ? `${prefix}` : `${prefix === '/' ? '' : prefix}/p/${startPoint + i + 1}`}`} start={startPoint} index={i} current={current}>
              {startPoint + i + 1}
            </TransparentLink>
          </Box>
        ))}
      </Flex>
    </Box>
  )
}

export default PaginationComponent