import React, { useEffect, useState } from 'react'

import { Box, Flex } from 'rebass'
import styled from 'styled-components'

import Poster from '../../../core/components/poster'

import { searchHentai } from '../services/searchHentai'

import { IFetchedRaw } from '../../../core/@types/IFetchedRaw'
import { IProps } from '../@types/IProps'

const StyledInput = styled.input`
	padding: 8px 10px;
	border: 1px solid #ccc;
	border-radius: 3px;
	margin-bottom: 10px;
	width: 100%;
	box-sizing: border-box;
	color: #2C3E50;
	font-size: 13px;
`

const SearchComponent: React.FC<IProps> = props => {
  const {raw} = props.pageContext

  const [query, setQuery] = useState<string>('')
  const [res, setRes] = useState<IFetchedRaw[]>([])

  useEffect(() => {
    if (query === '') {
      setRes([])
    } else {
      setRes(searchHentai(query, raw))
    }
  }, [query])

  return (
    <Box pt={3}>
      <Flex justifyContent={`center`}>
        <Box width={[20 / 24, 16 / 24, 12 / 24, 8 / 24]}>
          <StyledInput type={`text`} value={query} onChange={e => setQuery(e.target.value)} placeholder="Query" required={true} />
        </Box>
        <Flex justifyContent={`center`}>
          <Box width={22 / 24}>
            <Flex flexWrap={`wrap`} alignItems={`center`}>
              {res.map(hentai => (
                <Poster key={`poster-${hentai.data.id}`} raw={hentai.data.raw} />
              ))}
            </Flex>
          </Box>
        </Flex>
      </Flex>
    </Box>
  )
}

export default SearchComponent
