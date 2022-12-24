import Document, { Html, Head, Main, NextScript } from 'next/document'

import { Partytown } from '@builder.io/partytown/react'
class NextDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <Partytown forward={['dataLayer.push']} />

          <meta name="referrer" content="same-origin" />

          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-12TFVLTM16"
            type="text/partytown"
          ></script>
          <script
            type="text/partytown"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', 'G-12TFVLTM16');
              `,
            }}
          />
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
