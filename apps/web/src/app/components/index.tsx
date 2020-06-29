import React, { useEffect, useState } from 'react'

import { Helmet } from 'react-helmet'

import { CollectionMigration } from './collectionMigration'
import { Header } from './header'
import { ServiceWorker } from './serviceworker'

import { Props } from '../@types/Props'

import '../styles/index.css'

export const App: React.FC<Props> = props => {
  const { children, ...rest } = props

  const [clientMount, setClientMount] = useState<string>('nope')

  useEffect(() => {
    setClientMount('yup')
  }, [])

  return (
    <React.Fragment key={clientMount}>
      <Helmet
        defaultTitle="Riffy H"
        titleTemplate="%s · Riffy H"
        htmlAttributes={{ lang: 'en' }}
        meta={[
          { name: 'description', content: 'The missing piece of NHentai' },
          { name: 'referrer', content: 'same-origin' },
        ]}
        link={[
          {
            rel: 'stylesheet',
            media: 'screen,print',
            href:
              'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/fontawesome.min.css',
          },
          {
            rel: 'stylesheet',
            media: 'screen,print',
            href:
              'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/solid.min.css',
          },
        ]}
      />
      <div className="bg-gray-200 dark:bg-gray-900 flex flex-col md:flex-row min-h-full">
        <Header {...rest} />
        <div className="w-full md:pl-64">
          <main className="container mx-auto py-4 px-6 md:p-6">
            <div className="px-3 md:px-4 lg:px-5">
              <CollectionMigration />
              <ServiceWorker />
            </div>
            {children}
          </main>
        </div>
      </div>
    </React.Fragment>
  )
}

export default App
