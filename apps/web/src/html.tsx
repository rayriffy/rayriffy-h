import React, { ReactNode } from 'react'

interface Props {
  body: string
  bodyAttributes: string
  headComponents: ReactNode
  htmlAttributes: string
  preBodyComponents: ReactNode
  postBodyComponents: ReactNode
}

const HTMLComponent: React.FC<Props> = props => {
  const {
    htmlAttributes,
    headComponents,
    bodyAttributes,
    preBodyComponents,
    postBodyComponents,
    body,
  } = props

  return (
    <html {...htmlAttributes}>
      <head>
        <meta charSet='utf-8' />
        <meta httpEquiv='x-ua-compatible' content='ie=edge' />
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1, shrink-to-fit=no'
        />
        <link rel='preconnect' href='https://i.nhentai.net' />
        <link rel='preconnect' href='https://t.nhentai.net' />
        <link rel='dns-prefetch' href='https://i.nhentai.net' />
        <link rel='dns-prefetch' href='https://t.nhentai.net' />
        {headComponents}
      </head>
      <body {...bodyAttributes}>
        {preBodyComponents}
        <div
          key='body'
          id='___gatsby'
          dangerouslySetInnerHTML={{ __html: body }}
        />
        {postBodyComponents}
      </body>
    </html>
  )
}

export default HTMLComponent
