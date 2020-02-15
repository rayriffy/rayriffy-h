import React, { useContext } from 'react'

import { FaExternalLinkAlt, FaShareAlt } from 'react-icons/fa'

import {
  Box,
  Flex,
  IconButton,
  Link,
  Modal,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/core'
import styled from '@emotion/styled'

import { Collection } from '../../../store'

import API from './api'

import { IReaderShareProps } from '../../@types/IReaderShareProps'

const StyledLink = styled(Link)`
  text-decoration: none;
`

const ReaderShareComponent: React.FC<IReaderShareProps> = props => {
  const { hentai, internal } = props

  const { 0: collection, 1: setCollection } = useContext(Collection)

  const { isOpen, onOpen, onClose } = useDisclosure()

  const toggleFavorite = () => {
    const isFavorited =
      collection.data.find(o => o.id === hentai.id) === undefined

    let res = collection.data

    if (!isFavorited) {
      res = res.filter(o => o.id !== hentai.id)
    } else {
      res = [
        {
          id: hentai.id,
          internal,
          data: { ...hentai, images: { ...hentai.images, pages: [] } },
        },
        ...res,
      ]
    }

    setCollection({
      ...collection,
      data: res,
    })
  }

  return (
    <React.Fragment>
      <Flex alignItems='center'>
        <Box pr={1}>
          <IconButton
            size='sm'
            aria-label='favorite'
            variantColor='pink'
            onClick={toggleFavorite}
            icon={
              collection.data.find(o => o.id === hentai.id) === undefined
                ? 'add'
                : 'minus'
            }
          />
        </Box>
        <Box px={1}>
          <IconButton
            size='sm'
            aria-label='share'
            variantColor='blue'
            onClick={onOpen}
            icon={FaShareAlt}
          />
        </Box>
        <Box pl={1}>
          <StyledLink
            href={`https://nhentai.net/g/${hentai.id}`}
            target='_blank'
            aria-label='NHentai'
            rel='noopener noreferrer'>
            <IconButton
              size='sm'
              aria-label='open external'
              icon={FaExternalLinkAlt}
            />
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
