import React from 'react'

import { Box, Card, Flex, Image, Text } from 'rebass'
import styled from 'styled-components'

const BorderedCard = styled(Card)`
  border-radius: 8px;
  border: 1px solid #e8e8e8;
  overflow: hidden;

  background: #fff;
`

const WidthImage = styled(Image)`
  width: 100%
`

const NotAvaliableComponent = () => {
  return (
    <Flex justifyContent={`center`}>
      <Box width={[20 / 24, 16 / 24, 12 / 24, 8 / 24]}>
        <BorderedCard>
          <WidthImage src={`https://media.giphy.com/media/k1Lby1eaDTHsk/giphy.gif`} />
          <Box px={3} pt={1} pb={3}>
            <Text fontSize={[18, 20, 22, 24]} fontWeight={600} pt={2}>Not available</Text>
            <Text fontSize={[14, 15]} pt={2}>This page is not ready for production yet. Please come back later!</Text>
          </Box>
        </BorderedCard>
      </Box>
    </Flex>
  )
}

export default React.memo(NotAvaliableComponent)
