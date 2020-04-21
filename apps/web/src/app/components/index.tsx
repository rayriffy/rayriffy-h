import React, { useContext, useEffect } from 'react'

import { Helmet } from 'react-helmet'

// import { Collection } from '../../store'

import { Header } from './header'
import { ServiceWorker } from './serviceworker'

// import { collectionMigration } from '../service/collectionMigration'

import '../styles/index.css'

export const App: React.FC = props => {
  const { children } = props

  // const { 0: collection, 1: setCollection } = useContext(Collection)

  // useEffect(() => {
  //   if (typeof collection === 'string') {
  //     setCollection(collectionMigration(collection))
  //   }
  // }, [])

  return (
    <React.Fragment>
      <Helmet
        defaultTitle='Riffy H'
        titleTemplate='%s · Riffy H'
        htmlAttributes={{ lang: 'en' }}
        meta={[
          { name: 'description', content: 'The missing piece of NHentai' },
          { name: 'referrer', content: 'same-origin' },
        ]}
      />
      <div className='bg-gray-200 dark:bg-gray-900 flex flex-col md:flex-row'>
        <Header />
        <main className='container mx-auto pt-4'>
          <div className='px-3 md:px-4 lg:px-5'>
            <ServiceWorker />
          </div>
          {children}
        </main>
      </div>
    </React.Fragment>
  )
}

export default App
