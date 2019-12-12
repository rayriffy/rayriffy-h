import React from 'react'

import { Helmet } from 'react-helmet'

import { Box } from '@chakra-ui/core'

import Header from './header'
import ServiceWorker from './serviceworker'

const AppComponent: React.FC = props => {
  const { children } = props

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

export default AppComponent
