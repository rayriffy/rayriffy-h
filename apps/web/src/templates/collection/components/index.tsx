import React, { useContext, useEffect } from 'react'

import { Helmet } from 'react-helmet'

import { Collection, Subtitle } from '../../../store'

import { Search } from '../../../core/components/search'
import { Actions } from './actions'

import { Props } from '../@types/Props'

const Page: React.FC<Props> = props => {
  const { skip } = props.pageContext

  const [, setSubtitle] = useContext(Subtitle)
  const [collection, setCollection] = useContext(Collection)

  useEffect(() => {
    setSubtitle(`collection`)
  }, [])

  return (
    <React.Fragment>
      <Helmet title='Collection' />
      <Actions {...{ collection, setCollection }} />
      {collection.data.length === 0 ? (
        <div className='pt-12 text-center'>
          <div className='text-xl font-semibold text-gray-900 dark:text-white'>No records</div>
          <div className='text-gray-600 dark:text-gray-500'>Just take some time to read and add your favorite gallery here...</div>
        </div>
      ) : (
        <Search
          raw={collection.data.map(o => ({
            raw: o.data,
            internal: o.internal,
          }))}
          skip={skip}
          modeLock='list'
          showOnEmptyQuery
        />
      )}
    </React.Fragment>
  )
}

export default Page
