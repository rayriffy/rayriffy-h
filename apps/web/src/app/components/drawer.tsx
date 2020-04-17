import React, { useContext, useEffect, useRef, useState } from 'react'

import { FaBars as MenuIcon, FaHeart as LoveIcon } from 'react-icons/fa'

import {
  Box,
  Divider,
  Drawer as ChakraDrawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  IconButton,
  Switch,
  Text,
  useColorMode,
  useDisclosure,
  useTheme,
} from '@chakra-ui/core'

import { tags as tagStack } from '../../contents/database/tags'

import {
  Heading,
  headingFontColor,
  TransparentLink,
} from '../../core/components'

import { Settings } from '../../store'

const Component: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const { colorMode, toggleColorMode } = useColorMode()
  const { 0: settings, 1: setSettings } = useContext(Settings)

  const { 0: color, 1: setColor } = useState<string | undefined>(undefined)

  const btnRef = useRef(null)

  const theme = useTheme()

  const toggleSetting = (key: 'safemode' | 'lefthand') => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const menuStacks = [
    {
      name: 'listing',
      prefix: '',
    },
    {
      name: 'custom',
      prefix: 'custom',
    },
    {
      name: 'search',
      prefix: 'search',
    },
    {
      name: 'collection',
      prefix: 'collection',
    },
    {
      name: 'about',
      prefix: 'about',
    },
  ]

  const tagStacks = tagStack.map(o => ({
    name: o.name,
    prefix: o.prefix,
  }))

  useEffect(() => {
    setColor(colorMode ? headingFontColor[colorMode] : undefined)
  }, [colorMode])

  return (
    <React.Fragment>
      <IconButton
        ref={btnRef}
        aria-label='Menu'
        icon={MenuIcon}
        onClick={onOpen}
        bg='transparent'
        color={color}
        size='lg'
      />
      <ChakraDrawer
        isOpen={isOpen}
        placement={settings.lefthand ? 'left' : 'right'}
        onClose={onClose}
        isFullHeight={true}
        finalFocusRef={btnRef}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton color={color} />

          <DrawerBody p={0} overflow='auto'>
            <Box pt={10} px={6}>
              <Heading size='2xl'>Riffy H</Heading>
              <Text color='gray.500'>The missng piece of NHentai</Text>
              <Text color='gray.400' fontSize='xs'>
                Version 3.8.0
              </Text>
            </Box>
            <Divider mt={4} mb={2} />
            <Box px={6}>
              <Box py={2}>
                <Text fontSize='xl' fontWeight={600} py={2} color={color}>
                  Menu
                </Text>
                {menuStacks.map((stack, i) => {
                  return (
                    <Box key={`menu-stack-${stack.prefix}`}>
                      {i !== 0 ? <Divider /> : null}
                      <Box py={1}>
                        <TransparentLink
                          to={`/${stack.prefix}`}
                          aria-label={stack.name}>
                          <Text
                            fontSize='sm'
                            color='gray.500'
                            textTransform='capitalize'
                            py={1}>
                            {stack.name}
                          </Text>
                        </TransparentLink>
                      </Box>
                    </Box>
                  )
                })}
              </Box>
              <Box py={2}>
                <Text fontSize='xl' fontWeight={600} py={2} color={color}>
                  Tag Types
                </Text>
                {tagStacks.map((stack, i) => {
                  return (
                    <Box key={`menu-stack-${stack.prefix}`}>
                      {i !== 0 ? <Divider /> : null}
                      <Box py={1}>
                        <TransparentLink
                          to={`/${stack.prefix}`}
                          aria-label={stack.name}>
                          <Text
                            fontSize='sm'
                            color='gray.500'
                            textTransform='capitalize'
                            py={1}>
                            {stack.name}
                          </Text>
                        </TransparentLink>
                      </Box>
                    </Box>
                  )
                })}
              </Box>
              <Box py={2}>
                <Text fontSize='xl' fontWeight={600} py={2} color={color}>
                  Settings
                </Text>
                <Box py={2}>
                  <Flex py={1}>
                    <Switch
                      id='safemode'
                      isChecked={settings.safemode}
                      onChange={() => toggleSetting('safemode')}>
                      <React.Fragment />
                    </Switch>
                    <Text px={2} fontSize='sm' color='gray.500'>
                      Safe mode
                    </Text>
                  </Flex>
                  <Flex py={1}>
                    <Switch
                      id='darkmode'
                      isChecked={colorMode === 'dark'}
                      onChange={() =>
                        toggleColorMode ? toggleColorMode() : null
                      }>
                      <React.Fragment />
                    </Switch>
                    <Text px={2} fontSize='sm' color='gray.500'>
                      Dark mode
                    </Text>
                  </Flex>
                  <Flex py={1}>
                    <Switch
                      id='lefthand'
                      isChecked={settings.lefthand}
                      onChange={() => toggleSetting('lefthand')}>
                      <React.Fragment />
                    </Switch>
                    <Text px={2} fontSize='sm' color='gray.500'>
                      Left-handed mode
                    </Text>
                  </Flex>
                </Box>
              </Box>
            </Box>
            <Flex justifyContent='center' alignItems='center' py={4}>
              <Text fontSize='sm' color='gray.400'>
                Host with
              </Text>
              <Box px={1}>
                <LoveIcon
                  color={theme.colors.red[500]}
                />
              </Box>
              <Text fontSize='sm' color='gray.400'>
                by rayriffy
              </Text>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </ChakraDrawer>
    </React.Fragment>
  )
}

export const Drawer = React.memo(Component)
