import React from 'react'

import { NextPage } from 'next'
import { AppProps } from 'next/app'

import { Context } from '@rayriffy-h/state-engine'

import { AppLayout } from '../app/components/appLayout'
import { HeadTitle } from '../core/components/headTitle'

import '../styles/tailwind.css'

const App: NextPage<AppProps> = props => {
  const { Component, pageProps } = props

  return (
    <Context>
      <HeadTitle>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#4b6fff" />
        <meta name="apple-mobile-web-app-title" content="Riffy H" />
        <meta name="application-name" content="Riffy H" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="theme-color" content="#ffffff" />
      </HeadTitle>
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </Context>
  )
}

export default App
