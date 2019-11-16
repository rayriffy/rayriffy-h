import React, { useEffect, useState } from 'react'

import axios from 'axios'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { FaCopy, FaDownload } from 'react-icons/fa'

import { Box, Flex, Image, Link, Text } from 'rebass'
import styled from 'styled-components'

import { IReaderAPIProps } from '../../@types/IReaderAPIProps'
import { IReaderButton } from '../../@types/IReaderButton'

const API_ENDPOINT = 'https://h.api.rayriffy.com'

const StyledImage = styled(Image)`
  border-radius: 10px;
`

const LoadContainer = styled(Flex)`
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

const StyledButton = styled.button`
  border-radius: 4px;

  display: flex;
  justify-content: center;
  align-items: center;

  text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.12);
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.045);

  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);

  color: ${(props: IReaderButton) => (props.primary ? `#fff` : `rgba(0, 0, 0, 0.85)`)};
  background: ${(props: IReaderButton) => (props.primary ? `#1890ff` : `#fff`)};
  border: 1px solid ${(props: IReaderButton) => (props.primary ? `#1890ff` : `#d9d9d9`)};

  &:hover {
    color: ${(props: IReaderButton) => (props.primary ? `#fff` : `#40a9ff`)};
    background: ${(props: IReaderButton) => (props.primary ? `#40a9ff` : `#fff`)};
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
  const { id } = props

  const [image, setImage] = useState<string>('')
  const [error, setError] = useState<boolean>(false)
  const [isCopied, setIsCopied] = useState<boolean>(false)

  useEffect(() => {
    axios
      .get(`${API_ENDPOINT}/encode/${id}`)
      .then(res => {
        setImage(res.data.response.data)
      })
      .catch(() => {
        setError(true)
      })
  })

  return (
    <React.Fragment>
      <Box px={4}>
        <Flex justifyContent={`center`}>
          <Box width={[1, 1 / 2, 2 / 3]}>
            <Flex justifyContent={`center`}>
              {error ? (
                <LoadContainer flexDirection={`row`} alignItems={`center`} justifyContent={`center`} border={`#f5222d`}>
                  <LoadContent>
                    <StyledFlex justifyContent={`center`} alignItems={`center`}>
                      <Text color={`#f5222d`}>Filed to get an image</Text>
                    </StyledFlex>
                  </LoadContent>
                </LoadContainer>
              ) : image === '' ? (
                <LoadContainer flexDirection={`row`} alignItems={`center`} justifyContent={`center`} border={`#d9d9d9`}>
                  <LoadContent>
                    <StyledFlex justifyContent={`center`} alignItems={`center`}>
                      <Text color={`rgba(0, 0, 0, 0.65)`}>Loading</Text>
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
        <Text py={2} fontSize={15} fontWeight={500} textAlign={`center`}>
          Share securely with Opener
        </Text>
      </Box>
      {image !== '' ? (
        <Box py={2} px={2}>
          <Flex justifyContent={`center`} alignItems={`center`} flexWrap={`wrap`}>
            <Box p={2}>
              <StyledLink href={image} download={`encoded-${id}.jpeg`}>
                <StyledButton primary={true}>
                  <Flex alignItems={`center`} px={3} py={1}>
                    <FaDownload />
                    <Text pl={1} fontSize={14}>
                      Download
                    </Text>
                  </Flex>
                </StyledButton>
              </StyledLink>
            </Box>
            <Box p={2}>
              <CopyToClipboard text={id} onCopy={() => setIsCopied(true)}>
                <StyledButton>
                  {isCopied ? (
                    <Flex alignItems={`center`} px={3} py={1}>
                      <Text pl={1} fontSize={14}>
                        Copied!
                      </Text>
                    </Flex>
                  ) : (
                    <Flex alignItems={`center`} px={3} py={1}>
                      <FaCopy />
                      <Text pl={1} fontSize={14}>
                        Copy ID
                      </Text>
                    </Flex>
                  )}
                </StyledButton>
              </CopyToClipboard>
            </Box>
          </Flex>
        </Box>
      ) : null}
    </React.Fragment>
  )
}

export default React.memo(ReaderAPIComponent)
