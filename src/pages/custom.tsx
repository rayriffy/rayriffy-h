import React, { useContext, useEffect, useState } from 'react'

import { Box, Button, Card, Flex, Text } from 'rebass'
import styled from 'styled-components'

import { Subtitle } from '../app/context'

import TransparentLink from '../core/components/transparentLink'

const BorderedCard = styled(Card)`
  border-radius: 8px;
  border: 1px solid #e8e8e8;
  overflow: hidden;

  background: #fff;
`

const StyledInput = styled.input`
	padding: 8px 10px;
	border: 1px solid #ccc;
	border-radius: 3px;
	margin-bottom: 10px;
	width: 100%;
	box-sizing: border-box;
	color: #2C3E50;
	font-size: 13px;
`

const CustomComponent: React.FC = () => {
  const [input, setInput] = useState('')

  const [, setSubtitle] = useContext(Subtitle)

  useEffect(() => {
    setSubtitle('custom')
  }, [])

  return (
    <Box pt={3}>
      <Flex justifyContent={`center`}>
        <Box width={[20 / 24, 16 / 24, 12 / 24, 8 / 24]}>
          <BorderedCard p={3}>
            <Box p={2}>
              <Text fontSize={[18, 20, 22, 24]} fontWeight={600}>Custom</Text>
              <Box py={2}>
                <Text fontSize={[14, 15]}>Enter your hentai ID down below...</Text>
              </Box>
              <Box py={2}>
                <StyledInput type={`number`} value={input} onChange={e => setInput(e.target.value)} placeholder='000000' required={true} />
              </Box>
              <Box py={1}>
                {input === '' ? (
                  <Button bg={`#757575`} color={`#fff`} fontSize={14}>Locked</Button>
                ) : (
                  <TransparentLink to={`/g/${input}`}>
                    <Button bg={`#1890ff`} color={`#fff`} fontSize={14}>Ready</Button>
                  </TransparentLink>
                )}
              </Box>
            </Box>
          </BorderedCard>
        </Box>
      </Flex>
    </Box>
  )
}

export default CustomComponent
