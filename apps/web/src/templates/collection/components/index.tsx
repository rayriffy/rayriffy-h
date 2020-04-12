import React, { useContext, useEffect } from 'react'

import { isEmpty } from 'lodash-es'

import { Box, Flex, Text } from '@chakra-ui/core'

import { Collection, Subtitle } from '../../../store'

import { Heading, Search } from '../../../core/components'
import { Actions } from './actions'

import { Props } from '../@types/Props'

const Page: React.FC<Props> = props => {
  const { skip } = props.pageContext

  const { 1: setSubtitle } = useContext(Subtitle)
  const { 0: collection, 1: setCollection } = useContext(Collection)

  useEffect(() => {
    setSubtitle(`collection`)
  }, [])

  return (
    <Flex justifyContent='center'>
      <Box width={22 / 24}>
        <Actions {...{ collection, setCollection }} />
        {isEmpty(collection.data) ? (
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
            <Search
              raw={collection.data.map(o => o.data)}
              skip={skip}
              showOnEmptyQuery
            />
          </React.Fragment>
        )}
      </Box>
    </Flex>
  )
}

export default Page
