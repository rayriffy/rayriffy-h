import React from 'react'

import { Box, Flex, Heading, Image, Text } from '@chakra-ui/core'
import styled from '@emotion/styled'

const BorderedCard = styled(Box)`
  border-radius: 8px;
  border: 1px solid #e8e8e8;
  overflow: hidden;

  background: #fff;
`

const WidthImage = styled(Image)`
  width: 100%;
`

const NotAvaliableComponent = () => {
  return (
    <Flex justifyContent='center'>
      <Box width={[20 / 24, 16 / 24, 12 / 24, 8 / 24]}>
        <BorderedCard>
          <WidthImage src='https://media.giphy.com/media/k1Lby1eaDTHsk/giphy.gif' />
          <Box px={3} pt={1} pb={3}>
            <Heading size='lg' fontWeight={600}>
              Not available
            </Heading>
            <Text fontSize='sm' pt={2}>
              This page is not ready for production yet. Please come back later!
            </Text>
          </Box>
        </BorderedCard>
      </Box>
    </Flex>
  )
}

export default React.memo(NotAvaliableComponent)
