import React, { useEffect, useState } from 'react'

import { FaCopy, FaDownload } from 'react-icons/fa'

import {
  Box,
  Button,
  Flex,
  Image,
  Link,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  Text,
  useClipboard,
} from '@chakra-ui/core'
import styled from '@emotion/styled'

import { fetch } from '../../services/fetch'

import { IAPIResponse } from '../../@types/IAPIResponse'
import { IReaderAPIProps } from '../../@types/IReaderAPIProps'

const StyledImage = styled(Image)`
  border-radius: 10px;
`

const LoadContainer = styled(Flex)<{ border: string }>`
  position: relative;
  width: 100%;
  padding-top: 100%;

  overflow: hidden;

  border-radius: 10px;
  border: 1px solid ${(props: { border: string }) => props.border};
`

const LoadContent = styled(Box)`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`

const StyledFlex = styled(Flex)`
  height: 100%;
`

const StyledLink = styled(Link)`
  text-decoration: none;
`

const ReaderAPIComponent: React.FC<IReaderAPIProps> = props => {
  const { id } = props

  const { 0: image, 1: setImage } = useState<string>('')
  const { 0: error, 1: setError } = useState<boolean>(false)
  const { onCopy, hasCopied } = useClipboard(id)

  useEffect(() => {
    fetch<IAPIResponse<string>>(`https://h.api.rayriffy.com/v1/encode/${id}`)
      .then(res => {
        setImage(res.response.data)
      })
      .catch(() => {
        setError(true)
      })
  })

  return (
    <React.Fragment>
      <ModalContent>
        <ModalHeader>Share</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box px={4}>
            <Flex justifyContent='center'>
              <Box width={['100%', 1 / 2, 2 / 3]}>
                <Flex justifyContent='center'>
                  {error ? (
                    <LoadContainer
                      flexDirection='row'
                      alignItems='center'
                      justifyContent='center'
                      border='#f5222d'>
                      <LoadContent>
                        <StyledFlex justifyContent='center' alignItems='center'>
                          <Text color='#f5222d'>Filed to get an image</Text>
                        </StyledFlex>
                      </LoadContent>
                    </LoadContainer>
                  ) : image === '' ? (
                    <LoadContainer
                      flexDirection='row'
                      alignItems='center'
                      justifyContent='center'
                      border='#d9d9d9'>
                      <LoadContent>
                        <StyledFlex justifyContent='center' alignItems='center'>
                          <Text color='gray.500'>Loading</Text>
                        </StyledFlex>
                      </LoadContent>
                    </LoadContainer>
                  ) : (
                    <Box>
                      <StyledImage src={image} />
                    </Box>
                  )}
                </Flex>
              </Box>
            </Flex>
          </Box>
          <Box p={2}>
            <Text fontSize={15} fontWeight={500} textAlign='center'>
              Share securely with Opener
            </Text>
          </Box>
          {image !== '' ? (
            <Box py={2} px={2}>
              <Flex justifyContent='center' alignItems='center' flexWrap='wrap'>
                <Box p={2}>
                  <StyledLink
                    href={image}
                    download={`encoded-${id}.jpeg`}
                    aria-label='Download'
                    _hover={{ textDecoration: 'none' }}>
                    <Button size='sm' variantColor='blue'>
                      <Flex alignItems='center' px={3} py={1}>
                        <FaDownload />
                        <Text pl={1} fontSize='sm'>
                          Download
                        </Text>
                      </Flex>
                    </Button>
                  </StyledLink>
                </Box>
                <Box p={2}>
                  <Button size='sm' onClick={onCopy} variant='outline'>
                    {hasCopied === true ? (
                      <Flex alignItems='center' px={3} py={1}>
                        <Text pl={1} fontSize='sm'>
                          Copied!
                        </Text>
                      </Flex>
                    ) : (
                      <Flex alignItems='center' px={3} py={1}>
                        <FaCopy />
                        <Text pl={1} fontSize='sm'>
                          Copy ID
                        </Text>
                      </Flex>
                    )}
                  </Button>
                </Box>
              </Flex>
            </Box>
          ) : null}
        </ModalBody>
      </ModalContent>
    </React.Fragment>
  )
}

export default React.memo(ReaderAPIComponent)
