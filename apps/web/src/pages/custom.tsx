import React, { useContext, useEffect, useState } from 'react'

import { Box, Button, Flex, Input, Text, useColorMode } from '@chakra-ui/core'

import { Subtitle } from '../store'

import { Heading, TransparentLink } from '../core/components'

const CustomComponent: React.FC = () => {
  const { colorMode } = useColorMode()

  const { 0: input, 1: setInput } = useState('')

  const { 1: setSubtitle } = useContext(Subtitle)

  useEffect(() => {
    setSubtitle('custom')
  }, [])

  return (
    <Box pt={3}>
      <Flex justifyContent='center'>
        <Box
          borderRadius={8}
          border='1px solid #e8e8e8'
          overflow='hidden'
          bg={colorMode === 'dark' ? 'gray.700' : undefined}
          width={[20 / 24, 16 / 24, 12 / 24, 8 / 24]}
          p={5}>
          <Heading size='lg'>Custom</Heading>
          <Box py={2}>
            <Text fontSize={[14, 15]} color='gray.500'>
              Enter your hentai ID down below...
            </Text>
          </Box>
          <Box py={2}>
            <Input
              value={input}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setInput(e.target.value)
              }
              placeholder='000000'
              color={colorMode === 'dark' ? 'white' : undefined}
              _placeholder={{
                color: colorMode === 'dark' ? 'white' : 'gray.500',
              }}
            />
          </Box>
          <Box py={1}>
            {input === '' ? (
              <Button bg='#757575' color='white' fontSize='sm'>
                Locked
              </Button>
            ) : (
              <TransparentLink to={`/g/${input}`} aria-label='Ready'>
                <Button bg='#1890ff' color='white' fontSize='sm'>
                  Ready
                </Button>
              </TransparentLink>
            )}
          </Box>
        </Box>
      </Flex>
    </Box>
  )
}

export default CustomComponent
