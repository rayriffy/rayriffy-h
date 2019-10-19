import React, { useEffect, useState } from 'react'

import { Box, Button, Card, Flex, Text } from 'rebass'
import styled from 'styled-components'

import { searchHentai } from '../services/searchHentai'

import { IFetchedRaw } from '../../../core/@types/IFetchedRaw'
import { IProps } from '../@types/IProps'

const BorderedCard = styled(Card)`
  border-radius: 8px;
  border: 1px solid #e8e8e8;
  overflow: hidden;

  background: #fff;
`

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
    console.log(query)
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
        {res.map(o => o.data.id).join(' ')}
      </Flex>
    </Box>
  )
}

export default SearchComponent
