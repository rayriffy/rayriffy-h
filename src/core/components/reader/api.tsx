import React, { useState, useEffect } from 'react'

import axios from 'axios'
import { FaCopy, FaDownload } from 'react-icons/fa'

import { Box, Flex, Link, Image, Text } from 'rebass'
import styled from 'styled-components'

import { IReaderAPIProps } from '../../@types/IReaderAPIProps'
import { IReaderButton } from '../../@types/IReaderButton'

const API_ENDPOINT = 'https://h.api.rayriffy.com'

const StyledImage = styled(Image)`
  border-radius: 10px;
`

const StyledLoading = styled(Box)`
  width: 50vw;
  height: 50vw;
  border-radius: 10px;
  border: 1px solid #d9d9d9;
`

const StyledError = styled(Box)`
  width: 50vw;
  height: 50vw;
  border-radius: 10px;
  border: 1px solid #f5222d;
`

const StyledButton = styled.button`
  border-radius: 4px;

  display: flex;
  justify-content: center;
  align-items: center;

  text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.12);
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.045);

  transition: all .3s cubic-bezier(0.645, 0.045, 0.355, 1);

  color: ${(props: IReaderButton) => props.primary ? `#fff` : `rgba(0, 0, 0, 0.85)`};
  background: ${(props: IReaderButton) => props.primary ? `#1890ff` : `#fff`};
  border: 1px solid ${(props: IReaderButton) => props.primary ? `#1890ff` : `#d9d9d9`};

  &:hover {
    color: ${(props: IReaderButton) => props.primary ? `#fff` : `#40a9ff`};
    background: ${(props: IReaderButton) => props.primary ? `#40a9ff` : `#fff`};
    border: 1px solid #40a9ff;
  }
`

const StyledFlex = styled(Flex)`
  height: 100%;
`

const StyledLink = styled(Link)`
  text-decoration: none;
`

const ReaderAPIComponent: React.FC<IReaderAPIProps> = props => {
  const {id} = props

  const [image, setImage] = useState<string>('')
  const [error, setError] = useState<boolean>(false)

  useEffect(() => {
    axios
      .get(`${API_ENDPOINT}/encode/${id}`)
      .then(res => {
        setImage(res.data.response.data)
      })
      .catch(e => {
        console.log(e)
        setError(true)
      })
  })

  return (
    <Box>
      <Box px={4}>
        <Flex justifyContent={`center`}>
          <Box width={[1, 1 / 2, 2 / 3]}>
            <Flex justifyContent={`center`}>
              {error ? (
                <StyledError>
                  <StyledFlex justifyContent={`center`} alignItems={`center`}>
                    <Text color={`#f5222d`}>Filed to get an image</Text>
                  </StyledFlex>
                </StyledError>
              ) : image === '' ? (
                <StyledLoading>
                  <StyledFlex justifyContent={`center`} alignItems={`center`}>
                    <Text color={`rgba(0, 0, 0, 0.65)`}>Loading</Text>
                  </StyledFlex>
                </StyledLoading>
              ) : (
                <StyledImage src={image} />
              )}
            </Flex>
          </Box>
        </Flex>
      </Box>
      <Box p={2}>
        <Text fontSize={16} fontWeight={500} textAlign={`center`}>Share securely with Opener</Text>
      </Box>
      {image !== '' ? (
        <Box py={2} px={2}>
          <Flex justifyContent={`center`}>
            <Box px={2}>
              <StyledLink href={image} download={`encoded-${id}.jpeg`}>
                <StyledButton primary={true}>
                  <Flex alignItems={`center`} px={3} py={1}>
                    <FaDownload />
                    <Text pl={1} fontSize={14}>Download</Text>
                  </Flex>
                </StyledButton>
              </StyledLink>
            </Box>
            <Box px={2}>
              <StyledButton>
                <Flex alignItems={`center`} px={3} py={1}>
                  <FaCopy />
                  <Text pl={1} fontSize={14}>Copy</Text>
                </Flex>
              </StyledButton>
            </Box>
          </Flex>
        </Box>
      ) : null}
    </Box>
  )
}

export default ReaderAPIComponent
