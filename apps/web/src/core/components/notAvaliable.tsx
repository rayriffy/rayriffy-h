import React from 'react'

import { Box, Flex, Image, Text, useColorMode } from '@chakra-ui/core'

import { Heading } from '../../core/components'

const Component: React.FC = () => {
  const { colorMode } = useColorMode()

  return (
    <Flex justifyContent='center'>
      <Box width={[20 / 24, 16 / 24, 12 / 24, 8 / 24]}>
        <Box
          bg={colorMode === 'dark' ? 'gray.700' : undefined}
          borderRadius={8}
          border='1px solid #e8e8e8'
          overflow='hidden'>
          <Image
            m={0}
            width='100%'
            src='https://media.giphy.com/media/k1Lby1eaDTHsk/giphy.gif'
          />
          <Box p={3}>
            <Heading size='lg'>Not available</Heading>
            <Text fontSize='sm' pt={2} color='gray.500'>
              This page is not ready for production yet. Please come back later!
            </Text>
          </Box>
        </Box>
      </Box>
    </Flex>
  )
}

export const NotAvaliable = React.memo(Component)
