import React, { useState } from 'react'

import { FaExternalLinkAlt, FaShareAlt } from 'react-icons/fa'

import { Box, Flex, Link } from 'rebass'
import styled from 'styled-components'

import API from './api'
import Modal from './modal'

import { IReaderButton } from '../../@types/IReaderButton'
import { IReaderShareProps } from '../../@types/IReaderShareProps'

const CircleButton = styled(Box)`
  width: 35px;
  height: 35px;
  border-radius: 50%;

  display: flex;
  justify-content: center;
  align-items: center;

  text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.12);
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.045);

  transition: all .3s cubic-bezier(.645,.045,.355,1);

  color: ${(props: IReaderButton) => props.primary ? `#fff` : `rgba(0, 0, 0, 0.85)`};
  background: ${(props: IReaderButton) => props.primary ? `#1890ff` : `#fff`};
  border: 1px solid ${(props: IReaderButton) => props.primary ? `#1890ff` : `#d9d9d9`};

  &:hover {
    color: ${(props: IReaderButton) => props.primary ? `#fff` : `#40a9ff`};
    background: ${(props: IReaderButton) => props.primary ? `#40a9ff` : `#fff`};
    border: 1px solid ${(props: IReaderButton) => props.primary ? `#1890ff` : `#40a9ff`};
  }
`

const StyledLink = styled(Link)`
  text-decoration: none;
`

const ReaderShareComponent: React.FC<IReaderShareProps> = props => {
  const {hentai} = props

  const [isModal, setIsModal] = useState<boolean>(false)

  return (
    <React.Fragment>
      <Flex alignItems={`center`}>
        <Box pr={1}>
          <CircleButton onClick={() => setIsModal(true)} primary={true}>
            <Flex justifyContent={`center`} alignItems={`center`}>
              <FaShareAlt />
            </Flex>
          </CircleButton>
        </Box>
        <Box pl={1}>
          <StyledLink href={`https://nhentai.net/g/${hentai.id}`} target={`_blank`} rel={`noopener noreferrer`}>
            <CircleButton>
              <Flex justifyContent={`center`} alignItems={`center`}>
                <FaExternalLinkAlt />
              </Flex>
            </CircleButton>
          </StyledLink>
        </Box>
      </Flex>
      <Modal title={`Share`} isOpened={isModal} onClose={() => setIsModal(false)}>
        <API id={hentai.id} />
      </Modal>
    </React.Fragment>
  )
}

export default React.memo(ReaderShareComponent)
