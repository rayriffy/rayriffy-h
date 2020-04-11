import React from 'react'

import Document, { Head, Html, Main, NextScript } from 'next/document'

class NextDocument extends Document {
  public static async getInitialProps(ctx: any) {
    const initialProps = await Document.getInitialProps(ctx)

    return { ...initialProps }
  }

  public render() {
    return (
      <Html lang='en'>
        <Head>
          <meta name='referrer' content='same-origin' />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default NextDocument
