import React, { useContext, useEffect } from 'react'

import { isEmpty } from 'lodash-es'

import { Box, Flex, Text, ThemeProvider, ColorModeProvider } from '@chakra-ui/core'

import { Collection, Subtitle } from '../../../store'

import { Heading, Search } from '../../../core/components'
import { Actions } from './actions'

import { IProps } from '../@types/IProps'

const Page: React.FC<IProps> = props => {
  const { skip } = props.pageContext

  const { 1: setSubtitle } = useContext(Subtitle)
  const { 0: collection, 1: setCollection } = useContext(Collection)

  useEffect(() => {
    setSubtitle(`collection`)
  }, [])

  return (
    <ThemeProvider>
      <ColorModeProvider>
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
      </ColorModeProvider>
    </ThemeProvider>
  )
}

export default Page
