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

import { Collection } from '../../../store'

import { API } from './api'

import { ReaderShareProps } from '../../@types'

const Component: React.FC<ReaderShareProps> = props => {
  const { hentai, internal } = props

  const { 0: collection, 1: setCollection } = useContext(Collection)

  const { isOpen, onOpen, onClose } = useDisclosure()

  const toggleFavorite = () => {
    const isFavorited =
      collection.data.find(
        o =>
          (Number.isSafeInteger(Number(o.id)) ? Number(o.id) : o.id) ===
          hentai.id
      ) === undefined

    let res = collection.data

    if (!isFavorited) {
      res = res.filter(
        o =>
          (Number.isSafeInteger(Number(o.id)) ? Number(o.id) : o.id) !==
          hentai.id
      )
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
          <Link
            href={`https://nhentai.net/g/${hentai.id}`}
            target='_blank'
            aria-label='NHentai'
            textDecoration='none'
            rel='noopener noreferrer'>
            <IconButton
              size='sm'
              aria-label='open external'
              icon={FaExternalLinkAlt}
            />
          </Link>
        </Box>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <API id={hentai.id} />
      </Modal>
    </React.Fragment>
  )
}

export const Share = React.memo(Component)
