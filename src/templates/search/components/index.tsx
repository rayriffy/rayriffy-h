import _ from 'lodash'
import React, { useContext, useEffect, useState } from 'react'

import { FaSearch } from 'react-icons/fa'

import { Box, Button, Flex } from 'rebass'
import styled from 'styled-components'

import Poster from '../../../core/components/poster'
import Pagination from './pagination'

import { searchHentai } from '../services/searchHentai'

import { Subtitle } from '../../../app/context'

import { IFetchedRaw } from '../../../core/@types/IFetchedRaw'
import { IProps } from '../@types/IProps'

const StyledInput = styled.input`
	padding: 8px 10px;
	border: 1px solid #ccc;
	border-radius: 3px;
	width: 100%;
	box-sizing: border-box;
	color: #2C3E50;
	font-size: 13px;
`

const StyledButton = styled(Button)`
  background: blue;
  height: 36px;
`

const StyledFlex = styled(Flex)`
  height: 40px;
`

const SearchComponent: React.FC<IProps> = props => {
  const {raw, skip} = props.pageContext

  const [, setSubtitle] = useContext(Subtitle)

  const [query, setQuery] = useState<string>('')
  const [res, setRes] = useState<IFetchedRaw[]>([])

  const [page, setPage] = useState<number>(1)
  const [renderedRaw, setRenderedRaw] = useState<IFetchedRaw[]>([])

  const renderPage = (raws: IFetchedRaw[], page: number) => {
    setPage(page)
    setRenderedRaw(_.get(_.chunk(raws, skip), page - 1))
  }

  const searchButtonHandler = () => {
    if (query === '') {
      setRes([])
    } else {
      searchHentai(query, raw).then(results => setRes(results))
    }
  }

  useEffect(() => {
    if (!_.isEmpty(res)) {
      setPage(1)
      renderPage(res, 1)
    }
  }, [res])

  useEffect(() => {
    setSubtitle(`search`)
  }, [])

  return (
    <Box pt={3}>
      <Flex justifyContent={`center`}>
        <Box width={[20 / 24, 16 / 24, 12 / 24, 8 / 24]}>
          <StyledFlex alignItems={`center`}>
            <StyledInput type={`text`} value={query} onChange={e => setQuery(e.target.value)} onKeyDown={e => e.key === 'Enter' ? searchButtonHandler() : null} placeholder='Query' required={true} />
            <Box pl={2} width={36}>
              <StyledButton onClick={() => searchButtonHandler()}>
                <FaSearch />
              </StyledButton>
            </Box>
          </StyledFlex>
        </Box>
      </Flex>
      <Flex justifyContent={`center`}>
        <Box width={22 / 24}>
          {_.isEmpty(res) ? 'No result' : (
            <Box>
              <Flex justifyContent={`center`}>
                <Box width={18 / 24} py={3}>
                  <Pagination current={page} max={_.chunk(res, skip).length} onChange={page => renderPage(res, page)} />
                </Box>
              </Flex>
              <Flex justifyContent={`center`}>
                <Box width={22 / 24}>
                  <Flex flexWrap={`wrap`} alignItems={`center`}>
                    {renderedRaw.map(hentai => (
                      <Poster key={`poster-${hentai.data.id}`} raw={hentai.data.raw} />
                    ))}
                  </Flex>
                </Box>
              </Flex>
              <Flex justifyContent={`center`}>
                <Box width={18 / 24} py={3}>
                  <Pagination current={page} max={_.chunk(res, skip).length} onChange={page => renderPage(res, page)} />
                </Box>
              </Flex>
            </Box>
          )}
        </Box>
      </Flex>
    </Box>
  )
}

export default SearchComponent
