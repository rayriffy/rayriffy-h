import React from 'react'

import { FaTimes } from 'react-icons/fa'
import Mortal from 'react-mortal'

import { Box, Flex, Text } from 'rebass'
import styled from 'styled-components'

import Divider from '../divider'

import { IReaderModalProps } from '../../@types/IReaderModalProps'

interface IMotion {
  visible: boolean
}

const Modal = styled.div`
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  overflow: hidden;

  display: flex;
  align-items: center;
  justify-content: center;

  pointer-events: ${(props: IMotion) => (props.visible ? `auto` : `none`)};
`

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  background: rgba(0, 0, 0, 0.3);

  pointer-events: ${(props: IMotion) => (props.visible ? `auto` : `none`)};
`

const Wrapper = styled(Box)`
  background: #fff;
  border-radius: 4px;

  width: 100%;
  max-width: 520px;
`

const ReaderModalComponent: React.FC<IReaderModalProps> = props => {
  const { isOpened, title, onClose, children } = props

  return (
    <Mortal
      isOpened={isOpened}
      onClose={onClose}
      motionStyle={(spring, isVisible) => ({
        opacity: spring(isVisible ? 1 : 0),
        modalOffset: spring(isVisible ? 0 : -90, {
          stiffness: isVisible ? 300 : 200,
          damping: isVisible ? 15 : 30,
        }),
      })}>
      {(motion, isVisible) => (
        <Modal visible={isVisible}>
          <Overlay onClick={() => onClose()} visible={isVisible} style={{ opacity: motion.opacity }} />
          <Wrapper
            mx={[3, 2, 0]}
            mb={5}
            style={{ opacity: motion.opacity, transform: `translate3d(0, ${motion.modalOffset}px, 0)` }}>
            <Box px={3} pt={3}>
              <Flex alignItems={`center`}>
                <Text fontSize={16} fontWeight={500}>
                  {title}
                </Text>
                <Box mx={`auto`} />
                <FaTimes onClick={() => onClose()} />
              </Flex>
            </Box>
            <Box py={3}>
              <Divider />
            </Box>
            <Box px={3}>{children}</Box>
            <Box pb={3} />
          </Wrapper>
        </Modal>
      )}
    </Mortal>
  )
}

export default ReaderModalComponent
