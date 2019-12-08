import React from 'react'

import { Box, Flex, Image, Text, useColorMode } from '@chakra-ui/core'
import styled from '@emotion/styled'

import Heading from '../../core/components/heading'

const BorderedCard = styled(Box)`
  border-radius: 8px;
  border: 1px solid #e8e8e8;
  overflow: hidden;
`

const WidthImage = styled(Image)`
  width: 100%;
`

const NotAvaliableComponent = () => {
  const { colorMode } = useColorMode()

  return (
    <Flex justifyContent='center'>
      <Box width={[20 / 24, 16 / 24, 12 / 24, 8 / 24]}>
        <BorderedCard bg={colorMode === 'dark' ? 'gray.700' : undefined}>
          <WidthImage
            m={0}
            src='https://media.giphy.com/media/k1Lby1eaDTHsk/giphy.gif'
          />
          <Box p={3}>
            <Heading size='lg'>Not available</Heading>
            <Text fontSize='sm' pt={2} color='gray.500'>
              This page is not ready for production yet. Please come back later!
            </Text>
          </Box>
        </BorderedCard>
      </Box>
    </Flex>
  )
}

export default React.memo(NotAvaliableComponent)
