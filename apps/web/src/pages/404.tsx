import React, { useContext, useEffect } from 'react'

import { Box, Flex, Image, Text } from '@chakra-ui/core'

import { Subtitle } from '../store'

const NotFoundComponent: React.FC = () => {
  const { 1: setSubtitle } = useContext(Subtitle)

  useEffect(() => {
    setSubtitle('404')
  }, [])

  return (
    <Box pt={3}>
      <Flex justifyContent='center'>
        <Box borderRadius={8} border='1px solid #e8e8e8' overflow='hidden' width={[20 / 24, 16 / 24, 12 / 24, 8 / 24]}>
          <Image
            m={0}
            width='100%'
            src='https://media.giphy.com/media/uS1hYCwTrW3ks/giphy.gif'
          />
          <Box p={3}>
            <Text fontSize={[18, 20, 22, 24]} fontWeight={600}>
              Not found
            </Text>
            <Text fontSize={[14, 15]} pt={2}>
              The page your're looking for is not found
            </Text>
          </Box>
        </Box>
      </Flex>
    </Box>
  )
}

export default NotFoundComponent
