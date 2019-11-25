import React from 'react'

import { Box, Flex, Link } from '@chakra-ui/core'

import { IPaginationProps } from '../@types/IPaginationProps'

const PaginationComponent: React.FC<IPaginationProps> = props => {
  const { max, current, prefix } = props

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
          <Link
            href={
              startPoint + i === 0 ? prefix : `${prefix}p/${startPoint + i + 1}`
            }
            _hover={{ textDecoration: 'none' }}
            color={startPoint + i + 1 === current ? 'black' : 'gray.500'}>
            {startPoint + i + 1}
          </Link>
        </Box>
      ))}
    </Flex>
  )
}

export default React.memo(PaginationComponent)
