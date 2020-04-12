import React, { useContext, useEffect } from 'react'

import { Helmet } from 'react-helmet'

import { Box } from '@chakra-ui/core'

import { Collection } from '../../store'

import { Header } from './header'
import { ServiceWorker } from './serviceworker'

import { collectionMigration } from '../service/collectionMigration'

export const App: React.FC = props => {
  const { children } = props

  const { 0: collection, 1: setCollection } = useContext(Collection)

  useEffect(() => {
    if (typeof collection === 'string') {
      setCollection(collectionMigration(collection))
    }
  }, [])

  return (
    <Box pt={12}>
      <Helmet
        defaultTitle='Riffy H'
        titleTemplate='%s · Riffy H'
        htmlAttributes={{ lang: 'en' }}
        meta={[
          { name: 'description', content: 'The missing piece of NHentai' },
          { name: 'referrer', content: 'same-origin' },
        ]}
      />
      <Box px={[3, 4, 5]}>
        <Header />
        <ServiceWorker />
      </Box>
      {children}
    </Box>
  )
}

export default App
