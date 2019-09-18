import React from 'react'

import { Box, Card, Flex, Text } from 'rebass'
import styled from 'styled-components'

const BorderedCard = styled(Card)`
  border-radius: 8px;
  border: 1px solid #e8e8e8;

  background: #fff;
`

const NotFoundComponent: React.FC = () => {
  return (
    <Box py={3}>
      <Flex justifyContent={`center`}>
        <Box>
          <BorderedCard p={4}>
            <Text fontSize={58} fontWeight={700}>404</Text>
            <Text fontSize={24} fontWeight={600}>Not Found</Text>
          </BorderedCard>
        </Box>
      </Flex>
    </Box>
  )
}

export default NotFoundComponent
