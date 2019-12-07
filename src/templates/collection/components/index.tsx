import React, { useContext, useEffect, useState } from 'react'

import { chunk, get, isEmpty } from 'lodash'

import { Box, Flex, Heading, Text } from '@chakra-ui/core'

import { Collection, Subtitle } from '../../../app/context'

import Poster from '../../../core/components/poster'
import Pagination from './pagination'

import { IFavorite } from '../../../core/@types/IFavorite'
import { IProps } from '../@types/IProps'

const CollectionComponent: React.FC<IProps> = props => {
  const { skip } = props.pageContext

  const [, setSubtitle] = useContext(Subtitle)
  const [collection] = useContext(Collection)

  const [fetchedCollection, setFetchedCollection] = useState<IFavorite[]>([])

  const [page, setPage] = useState<number>(1)
  const [renderedCollection, setRenderedCollection] = useState<IFavorite[]>([])

  const renderPage = (collection: IFavorite[], page: number) => {
    setPage(page)
    setRenderedCollection(get(chunk(collection, skip), page - 1, []))
  }

  useEffect(() => {
    setFetchedCollection(JSON.parse(collection).reverse())
    renderPage(JSON.parse(collection).reverse(), 1)
  }, [collection])

  useEffect(() => {
    setSubtitle(`collection`)
  }, [])

  return (
    <Box pt={3}>
      <Flex justifyContent='center'>
        <Box width={22 / 24}>
          {isEmpty(fetchedCollection) ? (
            <React.Fragment>
              <Heading size='lg' textAlign='center' pt={6}>
                No favorite records
              </Heading>
              <Text textAlign='center' pt={4}>
                Just take some time to read and add your favorite records
                here...
              </Text>
            </React.Fragment>
          ) : (
            <Box>
              <Flex justifyContent='center'>
                <Box width={18 / 24} py={6}>
                  <Pagination
                    current={page}
                    max={chunk(fetchedCollection, skip).length}
                    onChange={page => renderPage(fetchedCollection, page)}
                  />
                </Box>
              </Flex>
              <Flex justifyContent='center'>
                <Box width={22 / 24}>
                  <Flex flexWrap='wrap' alignItems='center'>
                    {renderedCollection.map(hentai => (
                      <Poster
                        key={`poster-${hentai.id}`}
                        raw={hentai.data}
                        internal={hentai.internal}
                      />
                    ))}
                  </Flex>
                </Box>
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
            </Box>
          )}
        </Box>
      </Flex>
    </Box>
  )
}

export default CollectionComponent
