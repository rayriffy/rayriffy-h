import React from 'react'

import { FaExternalLinkAlt, FaShareAlt } from 'react-icons/fa'

import { Box, Flex } from 'rebass'
import styled from 'styled-components'

interface IButton {
  primary?: boolean
}

const CircleButton = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 50%;

  display: flex;
  justify-content: center;
  align-items: center;

  color: ${(props: IButton) => props.primary ? `#fff` : `rgba(0, 0, 0, 0.85)`};
  background-color: ${(props: IButton) => props.primary ? `#1890ff` : `#fff`};
  border: 1px solid ${(props: IButton) => props.primary ? `#1890ff` : `#d9d9d9`};
`

const ShareComponent: React.FC = () => {
  return (
    <Flex alignItems={`center`}>
      <Box pr={1}>
          <CircleButton primary={true}><FaShareAlt /></CircleButton>
      </Box>
      <Box pl={1}>
        <CircleButton><FaExternalLinkAlt /></CircleButton>
      </Box>
    </Flex>
  )
}

export default ShareComponent
