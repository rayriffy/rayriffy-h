import React, { useContext, useRef } from 'react'

import { FaBars as MenuIcon, FaHeart as LoveIcon } from 'react-icons/fa'

import {
  Box,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Heading,
  IconButton,
  Switch,
  Text,
  theme,
  useColorMode,
  useDisclosure,
} from '@chakra-ui/core'
import styled from '@emotion/styled'

import tagStack from '../../contents/database/tags'

import TransparentLink from '../../core/components/transparentLink'

import { SafeMode } from '../context'

const CapitalizedText = styled(Text)`
  text-transform: capitalize;
`

const DrawerComponent: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const { colorMode, toggleColorMode } = useColorMode()
  const [safeMode, setSafeMode] = useContext(SafeMode)

  const btnRef = useRef(null)

  const themeColor: any = theme.colors

  const toggleSafeMode = () => {
    setSafeMode(prev => !prev)
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

  return (
    <React.Fragment>
      <IconButton
        ref={btnRef}
        aria-label='Menu'
        icon={MenuIcon}
        onClick={onOpen}
        bg='transparent'
        size='lg'
      />
      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        finalFocusRef={btnRef}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />

          <DrawerBody p={0} overflow='scroll'>
            <Box pt={10} px={6}>
              <Heading size='xl'>Riffy H</Heading>
              <Text color='gray.500'>The missng piece of NHentai</Text>
              <Text color='gray.400' fontSize='xs'>
                Version 3.2.2
              </Text>
            </Box>
            <Divider mt={4} mb={2} />
            <Box px={6}>
              <Box py={2}>
                <Text fontSize='xl' fontWeight={600} py={2}>
                  Menu
                </Text>
                {menuStacks.map((stack, i) => {
                  return (
                    <Box key={`menu-stack-${stack.prefix}`}>
                      {i !== 0 ? <Divider /> : null}
                      <Box py={1}>
                        <TransparentLink to={`/${stack.prefix}`}>
                          <CapitalizedText
                            fontSize='sm'
                            color='gray.500'
                            py={1}>
                            {stack.name}
                          </CapitalizedText>
                        </TransparentLink>
                      </Box>
                    </Box>
                  )
                })}
              </Box>
              <Box py={2}>
                <Text fontSize='xl' fontWeight={600} py={2}>
                  Tag Types
                </Text>
                {tagStacks.map((stack, i) => {
                  return (
                    <Box key={`menu-stack-${stack.prefix}`}>
                      {i !== 0 ? <Divider /> : null}
                      <Box py={1}>
                        <TransparentLink to={`/${stack.prefix}`}>
                          <CapitalizedText
                            fontSize='sm'
                            color='gray.500'
                            py={1}>
                            {stack.name}
                          </CapitalizedText>
                        </TransparentLink>
                      </Box>
                    </Box>
                  )
                })}
              </Box>
              <Box py={2}>
                <Text fontSize='xl' fontWeight={600} py={2}>
                  Settings
                </Text>
                <Box py={2}>
                  <Flex py={1}>
                    <Switch
                      id='safemode'
                      isChecked={safeMode === undefined ? true : safeMode}
                      onChange={toggleSafeMode}>
                      <React.Fragment />
                    </Switch>
                    <Text px={2} fontSize='sm'>
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
                    <Text px={2} fontSize='sm'>
                      Dark mode (Experimental)
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
                  color={themeColor ? themeColor.red[500] : themeColor}
                />
              </Box>
              <Text fontSize='sm' color='gray.400'>
                by rayriffy
              </Text>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </React.Fragment>
  )
}

export default React.memo(DrawerComponent)
