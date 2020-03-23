import React, { useContext } from 'react'

import { Box, Divider, Flex, Text } from '@chakra-ui/core'

import { Heading } from '../../core/components'
import { Drawer } from '../components/drawer'

import { Settings, Subtitle } from '../../store'

export const Header = () => {
  const { 0: subtitle } = useContext(Subtitle)
  const { 0: settings } = useContext(Settings)

  return (
    <React.Fragment>
      <Flex
        flexDirection={settings.lefthand ? 'row-reverse' : 'row'}
        alignItems='center'>
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
