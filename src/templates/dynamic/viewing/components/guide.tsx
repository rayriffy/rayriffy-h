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
  width: 100%;
`

const GuideComponent: React.FC = () => {
  return (
    <Flex justifyContent={`center`}>
      <Box width={[20 / 24, 16 / 24, 12 / 24, 8 / 24]}>
        <BorderedCard>
          <WidthImage src={`https://media.giphy.com/media/OR0Ob6r1nMetO/giphy-downsized-large.gif`} />
          <Box px={3} pt={1} pb={3}>
            <Text fontSize={[18, 20, 22, 24]} fontWeight={600} pt={2}>
              Usage
            </Text>
            <Text fontSize={[14, 15]} pt={2}>
              Replace <b>nhentai.net</b>/g/:id with <b>h.rayriffy.com</b>/g/:id
            </Text>
          </Box>
        </BorderedCard>
      </Box>
    </Flex>
  )
}

export default React.memo(GuideComponent)
