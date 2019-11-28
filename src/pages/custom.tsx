import React, { useContext, useEffect, useState } from 'react'

import { Box, Button, Flex, Input, Text } from '@chakra-ui/core'
import styled from '@emotion/styled'

import { Subtitle } from '../app/context'

import TransparentLink from '../core/components/transparentLink'

const BorderedCard = styled(Box)`
  border-radius: 8px;
  border: 1px solid #e8e8e8;
  overflow: hidden;
`

const CustomComponent: React.FC = () => {
  const [input, setInput] = useState('')

  const [, setSubtitle] = useContext(Subtitle)

  useEffect(() => {
    setSubtitle('custom')
  }, [])

  return (
    <Box pt={3}>
      <Flex justifyContent='center'>
        <Box width={[20 / 24, 16 / 24, 12 / 24, 8 / 24]}>
          <BorderedCard p={3}>
            <Box p={2}>
              <Text fontSize={[18, 20, 22, 24]} fontWeight={600}>
                Custom
              </Text>
              <Box py={2}>
                <Text fontSize={[14, 15]}>
                  Enter your hentai ID down below...
                </Text>
              </Box>
              <Box py={2}>
                <Input
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder='000000'
                />
              </Box>
              <Box py={1}>
                {input === '' ? (
                  <Button bg='#757575' color='white' fontSize='sm'>
                    Locked
                  </Button>
                ) : (
                  <TransparentLink to={`/g/${input}`}>
                    <Button bg='#1890ff' color='white' fontSize='sm'>
                      Ready
                    </Button>
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
