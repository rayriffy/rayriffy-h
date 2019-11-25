import React from 'react'

import { FaExternalLinkAlt, FaShareAlt } from 'react-icons/fa'

import {
  Box,
  Flex,
  Link,
  Modal,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/core'
import styled from '@emotion/styled'

import API from './api'

import { IReaderButton } from '../../@types/IReaderButton'
import { IReaderShareProps } from '../../@types/IReaderShareProps'

const CircleButton = styled(Box)<IReaderButton>`
  width: 35px;
  height: 35px;
  border-radius: 50%;

  display: flex;
  justify-content: center;
  align-items: center;

  text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.12);
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.045);

  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);

  color: ${(props: IReaderButton) =>
    props.primary ? `#fff` : `rgba(0, 0, 0, 0.85)`};
  background: ${(props: IReaderButton) => (props.primary ? `#1890ff` : `#fff`)};
  border: 1px solid
    ${(props: IReaderButton) => (props.primary ? `#1890ff` : `#d9d9d9`)};

  &:hover {
    color: ${(props: IReaderButton) => (props.primary ? `#fff` : `#40a9ff`)};
    background: ${(props: IReaderButton) =>
      props.primary ? `#40a9ff` : `#fff`};
    border: 1px solid
      ${(props: IReaderButton) => (props.primary ? `#1890ff` : `#40a9ff`)};
  }
`

const StyledLink = styled(Link)`
  text-decoration: none;
`

const ReaderShareComponent: React.FC<IReaderShareProps> = props => {
  const { hentai } = props

  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <React.Fragment>
      <Flex alignItems='center'>
        <Box pr={1}>
          <CircleButton onClick={onOpen} primary={true}>
            <Flex justifyContent='center' alignItems='center'>
              <FaShareAlt />
            </Flex>
          </CircleButton>
        </Box>
        <Box pl={1}>
          <StyledLink
            href={`https://nhentai.net/g/${hentai.id}`}
            target='_blank'
            rel='noopener noreferrer'>
            <CircleButton>
              <Flex justifyContent='center' alignItems='center'>
                <FaExternalLinkAlt />
              </Flex>
            </CircleButton>
          </StyledLink>
        </Box>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <API id={hentai.id} />
      </Modal>
    </React.Fragment>
  )
}

export default React.memo(ReaderShareComponent)
