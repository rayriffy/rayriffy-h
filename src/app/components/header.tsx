import React, { useContext } from 'react'

import { Box, Flex, Text } from 'rebass'

import Divider from '../../core/components/divider'
import Drawer from '../components/drawer'

import { Subtitle } from '../context'

const HeaderComponent = () => {
  const [subtitle] = useContext(Subtitle)

  return (
    <React.Fragment>
      <Flex alignItems={`center`}>
        <Flex alignItems={`flex-end`} flexWrap={`wrap`}>
          <Text fontSize={42} fontWeight={700}>
            Riffy H
          </Text>
          <Text
            fontSize={30}
            fontWeight={600}
            color={`rgba(0, 0, 0, 0.45)`}
            px={2}
            pb={2}>
            {subtitle}
          </Text>
        </Flex>
        <Box mx={`auto`} />
        <Box px={3}>
          <Drawer />
        </Box>
      </Flex>
      <Divider py={1} />
    </React.Fragment>
  )
}

export default HeaderComponent
