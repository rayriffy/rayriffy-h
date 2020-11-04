import React from 'react'

import Document, { Html, Head, Main, NextScript } from 'next/document'

class NextDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default NextDocument
