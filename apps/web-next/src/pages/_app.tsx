import React from 'react'

import { NextPage } from 'next'
import { AppProps } from 'next/app'
import Head from 'next/head'

import { Context } from '@rayriffy-h/state-engine'

import { AppLayout } from '../app/components/appLayout'

import '../styles/tailwind.css'

const App: NextPage<AppProps> = props => {
  const { Component, pageProps } = props

  return (
    <Context>
      <Head>
        <title>Riffy H</title>
      </Head>
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </Context>
  )
}

export default App
