import React, { useContext, useState } from 'react'

import Mortal from 'react-mortal'
import Switch from 'react-switch'

import {
  FaBars as MenuIcon,
  FaHeart as LoveIcon,
  FaTimes as CloseIcon,
} from 'react-icons/fa'

import { Box, Flex, Text } from 'rebass'
import styled from 'styled-components'

import tagStack from '../../contents/database/tags'

import Divider from '../../core/components/divider'
import TransparentLink from '../../core/components/transparentLink'

import { SafeMode } from '../context'

interface IPanel {
  opacity?: number
  visible?: boolean
  panelOffset?: number
}

const CapitalizedText = styled(Text)`
  text-transform: capitalize;
`

const Panel = styled.div`
  position: fixed;
  z-index: 1;
  top: 0;
  bottom: 0;
  right: 0;

  pointer-events: ${(props: IPanel) => (props.visible ? `auto` : `none`)};
`

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);

  opacity: ${(props: IPanel) => props.opacity};
  pointer-events: ${(props: IPanel) => (props.visible ? `auto` : `none`)};
`

const Wrapper = styled(Box)`
  height: 100%;
  overflow: auto;

  background: #fff;

  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;

  transform: translate3d(${(props: IPanel) => props.panelOffset}%, 0, 0);
`

const DrawerComponent: React.FC = () => {
  const [open, setOpen] = useState(false)
  const [safeMode, setSafeMode] = useContext(SafeMode)

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
      <Box onClick={() => setOpen(true)}>
        <MenuIcon size={`20px`} />
      </Box>
      <Mortal
        isOpened={open}
        onClose={() => setOpen(false)}
        motionStyle={(spring, isVisible) => ({
          opacity: spring(isVisible ? 1 : 0),
          panelOffset: spring(isVisible ? 0 : 100),
        })}>
        {(motion, isVisible) => (
          <Panel visible={isVisible}>
            <Overlay
              onClick={() => setOpen(false)}
              visible={isVisible}
              opacity={motion.opacity}
            />
            <Wrapper width={[275, 300]} panelOffset={motion.panelOffset}>
              <Flex alignItems={`center`} pt={3} px={3}>
                <CloseIcon onClick={() => setOpen(false)} size={`20px`} />
              </Flex>
              <Box pt={4} px={3}>
                <Text fontSize={32} fontWeight={700}>
                  Riffy H
                </Text>
                <Text color={`rgba(0, 0, 0, 0.45)`}>
                  The missng piece of NHentai
                </Text>
              </Box>
              <Divider py={2} />
              <Box px={4}>
                <Box py={2}>
                  <Text fontSize={20} fontWeight={600} py={2}>
                    Menu
                  </Text>
                  {menuStacks.map((stack, i) => {
                    return (
                      <Box key={`menu-stack-${stack.prefix}`}>
                        {i !== 0 ? <Divider /> : null}
                        <Box py={2}>
                          <TransparentLink to={`/${stack.prefix}`}>
                            <CapitalizedText
                              fontSize={14}
                              color={`rgba(0, 0, 0, 0.65)`}
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
                  <Text fontSize={20} fontWeight={600} py={2}>
                    Tag Types
                  </Text>
                  {tagStacks.map((stack, i) => {
                    return (
                      <Box key={`menu-stack-${stack.prefix}`}>
                        {i !== 0 ? <Divider /> : null}
                        <Box py={2}>
                          <TransparentLink to={`/${stack.prefix}`}>
                            <CapitalizedText
                              fontSize={14}
                              color={`rgba(0, 0, 0, 0.65)`}
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
                  <Text fontSize={20} fontWeight={600} py={2}>
                    Settings
                  </Text>
                  <Box py={2}>
                    <Flex>
                      <Switch
                        height={18}
                        width={40}
                        checked={safeMode === undefined ? true : safeMode}
                        onChange={toggleSafeMode}
                      />
                      <Text fontSize={14} px={2}>
                        Safe mode
                      </Text>
                    </Flex>
                  </Box>
                </Box>
              </Box>
              <Flex justifyContent={`center`} py={3}>
                <Text fontSize={14} color={`rgba(0,0,0,0.45)`}>
                  Host with
                </Text>
                <Box px={1}>
                  <LoveIcon color={`#f32929`} />
                </Box>
                <Text fontSize={14} color={`rgba(0,0,0,0.45)`}>
                  by rayriffy
                </Text>
              </Flex>
            </Wrapper>
          </Panel>
        )}
      </Mortal>
    </React.Fragment>
  )
}

export default React.memo(DrawerComponent)
