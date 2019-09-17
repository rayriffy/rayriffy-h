import React, { useState } from 'react'

import { Link } from 'gatsby'

import { FaAngleDoubleRight as RightIcon, FaBars as MenuIcon, FaHeart as LoveIcon } from 'react-icons/fa'
import Drawer from 'react-motion-drawer'

import { Box, Flex, Text } from 'rebass'
import styled from 'styled-components'

import Divider from '../../core/components/divider'

const Wrapper = styled(Box)`
  width: 100%;
  height: 100%;
  overflow: auto;

  background: #fff;
`

const TransparentLink = styled(Link)`
  text-decoration: none;
`

const DrawerComponent: React.FC = () => {
  const [open, setOpen] = useState(false)

  const menuStacks = [
    {
      name: 'Listing',
      prefix: '',
    },
    {
      name: 'Custom',
      prefix: 'custom',
    },
    {
      name: 'Search',
      prefix: 'search',
    },
  ]

  const tagStacks = [
    {
      name: 'Tag',
      prefix: 'ta',
    },
    {
      name: 'Artist',
      prefix: 'ar',
    },
    {
      name: 'Character',
      prefix: 'ch',
    },
    {
      name: 'Parody',
      prefix: 'pa',
    },
    {
      name: 'Group',
      prefix: 'gr',
    },
    {
      name: 'Category',
      prefix: 'ca',
    },
    {
      name: 'Language',
      prefix: 'la',
    }
  ]

  return (
    <Box>
      <MenuIcon size={`20px`} onClick={() => setOpen(true)} />
      <Drawer
        open={open}
        width={340}
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
                        <Text fontSize={14} color={`rgba(0, 0, 0, 0.65)`} py={1}>{stack.name}</Text>
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
                        <Text fontSize={14} color={`rgba(0, 0, 0, 0.65)`} py={1}>{stack.name}</Text>
                      </TransparentLink>
                    </Box>
                  </Box>
                )
              })}
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
