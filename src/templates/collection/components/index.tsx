import React, { useContext, useEffect, useState } from 'react'

import { chunk, get, isEmpty } from 'lodash-es'

import { Box, Flex, Text } from '@chakra-ui/core'

import { Collection, Subtitle } from '../../../store'

import Heading from '../../../core/components/heading'
import Poster from '../../../core/components/poster'
import Actions from './actions'
import Pagination from './pagination'

import { IFavorite } from '../../../core/@types/IFavorite'
import { IProps } from '../@types/IProps'

const CollectionComponent: React.FC<IProps> = props => {
  const { skip } = props.pageContext

  const { 1: setSubtitle } = useContext(Subtitle)
  const { 0: collection, 1: setCollection } = useContext(Collection)

  const { 0: fetchedCollection, 1: setFetchedCollection } = useState<
    IFavorite[]
  >([])

  const { 0: page, 1: setPage } = useState<number>(1)
  const { 0: renderedCollection, 1: setRenderedCollection } = useState<
    IFavorite[]
  >([])

  const renderPage = (collection: IFavorite[], page: number) => {
    setPage(page)
    setRenderedCollection(get(chunk(collection, skip), page - 1, []))
  }

  useEffect(() => {
    setFetchedCollection(collection.data.reverse())
    renderPage(collection.data.reverse(), 1)
  }, [collection])

  useEffect(() => {
    setSubtitle(`collection`)
  }, [])

  return (
    <Flex justifyContent='center'>
      <Box width={22 / 24}>
        <Actions {...{ collection, setCollection }} />
        {isEmpty(fetchedCollection) ? (
          <React.Fragment>
            <Heading size='lg' textAlign='center' pt={6}>
              No records
            </Heading>
            <Text textAlign='center' pt={4} color='gray.500'>
              Just take some time to read and add your favorite records here...
            </Text>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Flex justifyContent='center'>
              <Box width={18 / 24} pt={3} pb={6}>
                <Pagination
                  current={page}
                  max={chunk(fetchedCollection, skip).length}
                  onChange={page => renderPage(fetchedCollection, page)}
                />
              </Box>
            </Flex>
            <Flex justifyContent='center'>
              <Flex width={22 / 24} flexWrap='wrap' alignItems='center'>
                {renderedCollection.map(hentai => (
                  <Poster
                    key={`poster-${hentai.id}`}
                    raw={hentai.data}
                    internal={hentai.internal}
                  />
                ))}
              </Flex>
            </Flex>
            <Flex justifyContent='center'>
              <Box width={18 / 24} py={6}>
                <Pagination
                  current={page}
                  max={chunk(fetchedCollection, skip).length}
                  onChange={page => renderPage(fetchedCollection, page)}
                />
              </Box>
            </Flex>
          </React.Fragment>
        )}
      </Box>
    </Flex>
  )
}

export default CollectionComponent
