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

import { Collection } from '../../../app/context'

import API from './api'

import { IFavorite } from '../../../core/@types/IFavorite'
import { IReaderShareProps } from '../../@types/IReaderShareProps'

const StyledLink = styled(Link)`
  text-decoration: none;
`

const ReaderShareComponent: React.FC<IReaderShareProps> = props => {
  const { hentai, internal } = props

  const [collection, setCollection] = useContext(Collection)
  const fetchedCollection: IFavorite[] = JSON.parse(collection)

  const { isOpen, onOpen, onClose } = useDisclosure()

  const toggleFavorite = () => {
    const isFavorited =
      fetchedCollection.find(o => o.id === hentai.id) === undefined

    let res = fetchedCollection

    if (!isFavorited) {
      res = res.filter(o => o.id !== hentai.id)
    } else {
      res = [
        ...res,
        {
          id: hentai.id,
          internal,
          data: { ...hentai, images: { ...hentai.images, pages: [] } },
        },
      ]
    }

    setCollection(JSON.stringify(res))
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
              fetchedCollection.find(o => o.id === hentai.id) === undefined
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
            rel='noopener noreferrer'>
            <IconButton
              size='sm'
              aria-label='open external'
              onClick={onOpen}
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
