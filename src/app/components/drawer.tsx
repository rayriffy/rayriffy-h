import React, { useContext, useState } from 'react'

import { set as lsSet } from 'local-storage'
import Switch from 'react-switch'

import { FaAngleDoubleRight as RightIcon, FaBars as MenuIcon, FaHeart as LoveIcon } from 'react-icons/fa'
import Drawer from 'react-motion-drawer'

import { Box, Flex, Text } from 'rebass'
import styled from 'styled-components'

import tagStack from '../../contents/database/tags'

import Divider from '../../core/components/divider'
import TransparentLink from '../../core/components/transparentLink'

import { SafeMode } from '../context'

const Wrapper = styled(Box)`
  width: 100%;
  height: 100%;
  overflow: auto;

  background: #fff;
`

const CapitalizedText = styled(Text)`
  text-transform: capitalize;
`

const DrawerComponent: React.FC = () => {
  const [open, setOpen] = useState(false)
  const [safeMode, setSafeMode] = useContext(SafeMode)

  const toggleSafeMode = () => {
    const newState = !safeMode

    if (setSafeMode) {
      setSafeMode(newState)
    }

    lsSet<boolean>('blur', newState)
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
  ]

  const tagStacks = tagStack.map(o => ({
    name: o.name,
    prefix: o.prefix,
  }))

  return (
    <Box>
      <Box onClick={() => setOpen(true)}>
        <MenuIcon size={`20px`} />
      </Box>
      <Drawer
        open={open}
        width={275}
        right={true}
        noTouchOpen={true}
        onChange={(state: boolean) => setOpen(state)}
      >
        <Wrapper>
          <Box pt={3} px={3}>
            <Box>
              <Flex>
                <RightIcon size={`20px`} />
                <Text fontSize={14} pl={1}>Swipe right to close</Text>
              </Flex>
            </Box>
          </Box>
          <Box pt={4} px={3}>
            <Text fontSize={32} fontWeight={700}>Riffy H</Text>
            <Text color={`rgba(0, 0, 0, 0.45)`}>The missng piece of NHentai</Text>
          </Box>
          <Divider py={2} />
          <Box px={4}>
            <Box py={2}>
              <Text fontSize={20} fontWeight={600} py={2}>Menu</Text>
              {menuStacks.map((stack, i) => {
                return (
                  <Box key={`menu-stack-${stack.prefix}`}>
                    {i !== 0 ? <Divider /> : null}
                    <Box py={2}>
                      <TransparentLink to={`/${stack.prefix}`}>
                        <CapitalizedText fontSize={14} color={`rgba(0, 0, 0, 0.65)`} py={1}>{stack.name}</CapitalizedText>
                      </TransparentLink>
                    </Box>
                  </Box>
                )
              })}
            </Box>
            <Box py={2}>
              <Text fontSize={20} fontWeight={600} py={2}>Tag Types</Text>
              {tagStacks.map((stack, i) => {
                return (
                  <Box key={`menu-stack-${stack.prefix}`}>
                    {i !== 0 ? <Divider /> : null}
                    <Box py={2}>
                      <TransparentLink to={`/${stack.prefix}`}>
                        <CapitalizedText fontSize={14} color={`rgba(0, 0, 0, 0.65)`} py={1}>{stack.name}</CapitalizedText>
                      </TransparentLink>
                    </Box>
                  </Box>
                )
              })}
            </Box>
            <Box py={2}>
              <Text fontSize={20} fontWeight={600} py={2}>Settings</Text>
              <Box py={2}>
                <Flex>
                  <Box>
                    <Switch height={18} width={40} checked={safeMode === undefined ? true : safeMode} onChange={toggleSafeMode} />
                  </Box>
                  <Box px={2}>
                    <Text fontSize={14}>Safe mode</Text>
                  </Box>
                </Flex>
              </Box>
            </Box>
          </Box>
          <Box py={3}>
            <Flex justifyContent={`center`}>
              <Text fontSize={14} color={`rgba(0,0,0,0.45)`}>Host with</Text>
              <Box px={1}>
                <LoveIcon color={`#f32929`} />
              </Box>
              <Text fontSize={14} color={`rgba(0,0,0,0.45)`}>by rayriffy</Text>
            </Flex>
          </Box>
        </Wrapper>
      </Drawer>
    </Box>
  )
}

export default DrawerComponent
