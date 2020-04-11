import React from 'react'

import App from 'next/app'
import Head from 'next/head'

import AppShell from '../app/components'

class NextApp extends App {
  public render() {
    const { Component, pageProps } = this.props

    return (
      <AppShell>
        <Head>
          <title>Poster API</title>
        </Head>
        <Component {...pageProps} />
      </AppShell>
    )
  }
}

export default NextApp
