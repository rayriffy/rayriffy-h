import React, { useMemo } from 'react'

import Head from 'next/head'
import { useRouter } from 'next/router'

interface IProps {
  title?: string
  description?: string
}

export const HeadTitle: React.FC<IProps> = props => {
  const {
    title,
    description = 'The missing piece of NHentai',
    children,
  } = props

  const router = useRouter()

  const transformedTitle = useMemo(
    () => (title ? `${title} · Riffy H` : 'Riffy H'),
    [title]
  )

  return (
    <Head>
      <title>{transformedTitle}</title>
      <meta name="title" content={transformedTitle} />
      <meta name="description" content={description} />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={router.asPath} />
      <meta property="og:title" content={transformedTitle} />
      <meta property="og:description" content={description} />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={router.asPath} />
      <meta property="twitter:title" content={transformedTitle} />
      <meta property="twitter:description" content={description} />

      {children}
    </Head>
  )
}
