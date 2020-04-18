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

import { fetch } from '@rayriffy-h/fetch'
import { APIResponse } from '@rayriffy-h/helper'

import { ReaderAPIProps } from '../../@types'

const LoadContainer = styled(Flex)<{ border: string }>(props => ({
  position: 'relative',
  width: '100%',
  paddingTop: '100%',
  overflow: 'hidden',
  borderRadius: 10,
  border: `1px solid ${props.border}`,
}))

const LoadContent = styled(Box)(() => ({
  position: 'absolute',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
}))

const Component: React.FC<ReaderAPIProps> = props => {
  const { id } = props

  const { 0: image, 1: setImage } = useState<string>('')
  const { 0: error, 1: setError } = useState<boolean>(false)
  const { onCopy, hasCopied } = useClipboard(id)

  useEffect(() => {
    fetch<APIResponse<string>>(`https://h.api.rayriffy.com/v1/encode/${id}`)
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
                        <Flex justifyContent='center' alignItems='center' height='100%'>
                          <Text color='#f5222d'>Filed to get an image</Text>
                        </Flex>
                      </LoadContent>
                    </LoadContainer>
                  ) : image === '' ? (
                    <LoadContainer
                      flexDirection='row'
                      alignItems='center'
                      justifyContent='center'
                      border='#d9d9d9'>
                      <LoadContent>
                        <Flex justifyContent='center' alignItems='center' height='100%'>
                          <Text color='gray.500'>Loading</Text>
                        </Flex>
                      </LoadContent>
                    </LoadContainer>
                  ) : (
                    <Box>
                      <Image borderRadius={10} src={image} />
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
                  <Link
                    href={image}
                    textDecoration='none'
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
                  </Link>
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

export const API = React.memo(Component)
