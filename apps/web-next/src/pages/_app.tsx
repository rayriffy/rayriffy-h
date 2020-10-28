import React from 'react'

import { NextPage } from 'next'
import { AppProps } from 'next/app'
import Head from 'next/head'

import { AppLayout } from '../app/components/appLayout'

import '../styles/tailwind.css'

const App: NextPage<AppProps> = props => {
  const { Component, pageProps } = props

  return (
    <React.Fragment>
      <Head>
        <title>Riffy H</title>
      </Head>
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </React.Fragment>
  )
}

export default App
