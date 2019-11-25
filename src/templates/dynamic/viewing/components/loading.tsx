import React from 'react'

import { Box, Flex, Image, Text } from '@chakra-ui/core'
import styled from '@emotion/styled'

const BorderedCard = styled(Box)`
  border-radius: 8px;
  border: 1px solid #e8e8e8;
  overflow: hidden;
`

const WidthImage = styled(Image)`
  width: 100%;
`

const LoadingComponent: React.FC = () => {
  return (
    <Flex justifyContent='center'>
      <Box width={[20 / 24, 16 / 24, 12 / 24, 8 / 24]}>
        <BorderedCard>
          <WidthImage src='https://media.giphy.com/media/wOYZxHS8Ugnni/giphy.gif' />
          <Box px={3} pt={1} pb={3}>
            <Text fontSize={[18, 20, 22, 24]} fontWeight={600} pt={2}>
              Loading
            </Text>
            <Text fontSize={[14, 15]} pt={2}>
              This should take a while...
            </Text>
            <Text fontSize={[14, 15]}>(but no longer a minute)</Text>
          </Box>
        </BorderedCard>
      </Box>
    </Flex>
  )
}

export default React.memo(LoadingComponent)
