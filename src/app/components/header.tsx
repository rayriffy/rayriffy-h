import React, { useContext } from 'react'

import { Box, Divider, Flex, Heading, Text } from '@chakra-ui/core'

import Drawer from '../components/drawer'

import { Subtitle } from '../context'

const HeaderComponent = () => {
  const [subtitle] = useContext(Subtitle)

  return (
    <React.Fragment>
      <Flex alignItems='center'>
        <Flex alignItems='flex-end' flexWrap='wrap'>
          <Heading size='2xl'>Riffy H</Heading>
          <Text fontSize={30} fontWeight={600} color='gray.500' px={2}>
            {subtitle}
          </Text>
        </Flex>
        <Box mx='auto' />
        <Box px={3}>
          <Drawer />
        </Box>
      </Flex>
      <Divider my={4} />
    </React.Fragment>
  )
}

export default HeaderComponent
