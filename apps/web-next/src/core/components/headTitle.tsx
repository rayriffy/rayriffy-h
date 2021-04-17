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
    description = 'The missing piece of nhentai',
    children,
  } = props

  const router = useRouter()

  const transformedTitle = useMemo(
    () => (title ? `${title} · Riffy H` : 'Riffy H'),
    [title]
  )

  return (
    <Head>
      <title key="head-title">{transformedTitle}</title>
      <meta key="title" name="title" content={transformedTitle} />
      <meta key="description" name="description" content={description} />

      <meta key="og:type" property="og:type" content="website" />
      <meta key="og:url" property="og:url" content={router.asPath} />
      <meta key="og:title" property="og:title" content={transformedTitle} />
      <meta key="og:description" property="og:description" content={description} />

      <meta key="twitter:card" property="twitter:card" content="summary_large_image" />
      <meta key="twitter:url" property="twitter:url" content={router.asPath} />
      <meta key="twitter:title" property="twitter:title" content={transformedTitle} />
      <meta key="twitter:description" property="twitter:description" content={description} />

      <meta key="robots" name="robots" content="noindex" />

      {children}
    </Head>
  )
}
