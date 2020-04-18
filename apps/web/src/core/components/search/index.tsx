import React, { useEffect, useState } from 'react'

import { chunk, get, isEmpty } from 'lodash-es'

import { Box, Flex, IconButton, Input, useColorMode } from '@chakra-ui/core'

import * as searchHentaiWorker from '../../services/worker/searchHentai.worker'

import { Heading, Poster } from '../'
import { Pagination } from './pagination'

import { Hentai } from '@rayriffy-h/helper'
import { SearchProps } from '../../@types'

export const Search: React.FC<SearchProps> = props => {
  const { raw, skip, showOnEmptyQuery = false } = props

  const { colorMode } = useColorMode()

  const { 0: query, 1: setQuery } = useState<string>('')
  const { 0: res, 1: setRes } = useState<Hentai[]>(showOnEmptyQuery ? raw : [])

  const { 0: page, 1: setPage } = useState<number>(1)
  const { 0: renderedRaw, 1: setRenderedRaw } = useState<Hentai[]>([])

  const { searchHentai } =
    typeof window === 'object'
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ? ((searchHentaiWorker as any)() as typeof searchHentaiWorker)
      : { searchHentai: null }

  const renderPage = (raws: Hentai[], page: number) => {
    setPage(page)
    setRenderedRaw(get(chunk(raws, skip), page - 1))
  }

  const searchButtonHandler = () => {
    if (query === '') {
      setRes(showOnEmptyQuery ? raw : [])
    } else {
      if (searchHentai !== null) {
        searchHentai(query, raw).then(results => setRes(results))
      }
    }
  }

  useEffect(() => {
    if (!isEmpty(res)) {
      setPage(1)
      renderPage(res, 1)
    }
  }, [res])

  return (
    <React.Fragment>
      <Flex justifyContent='center' pt={3}>
        <Flex
          width={[20 / 24, 16 / 24, 12 / 24, 8 / 24]}
          justifyContent='center'>
          <Input
            placeholder='Search'
            value={query}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setQuery(e.target.value)
            }
            color={colorMode === 'dark' ? 'white' : undefined}
            _placeholder={{
              color: colorMode === 'dark' ? 'white' : 'gray.500',
            }}
            onKeyDown={(e: { key: string }) =>
              e.key === 'Enter' ? searchButtonHandler() : null
            }
          />
          <Box mx={2} />
          <IconButton
            aria-label='Search'
            icon='search'
            variantColor='blue'
            onClick={() => searchButtonHandler()}
          />
        </Flex>
      </Flex>
      <Flex justifyContent='center'>
        <Box width={22 / 24}>
          {isEmpty(res) ? (
            <Heading size='lg' textAlign='center' pt={6}>
              No result
            </Heading>
          ) : (
            <React.Fragment>
              <Flex justifyContent='center'>
                <Box width={18 / 24} py={6}>
                  <Pagination
                    current={page}
                    max={chunk(res, skip).length}
                    onChange={page => renderPage(res, page)}
                  />
                </Box>
              </Flex>
              <Flex justifyContent='center'>
                <Flex width={22 / 24} flexWrap='wrap' alignItems='center'>
                  {renderedRaw.map(hentai => (
                    <Poster key={`poster-${hentai.id}`} raw={hentai} />
                  ))}
                </Flex>
              </Flex>
              <Flex justifyContent='center'>
                <Box width={18 / 24} py={6}>
                  <Pagination
                    current={page}
                    max={chunk(res, skip).length}
                    onChange={page => renderPage(res, page)}
                  />
                </Box>
              </Flex>
            </React.Fragment>
          )}
        </Box>
      </Flex>
    </React.Fragment>
  )
}
