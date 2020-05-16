import React, { useState, useEffect, useContext } from 'react'

import { getSearch, Hentai } from '@rayriffy-h/helper'

import { Subtitle } from '../store'

import { Pagination } from '../core/components/pagination'
import { Listing } from '../core/components/listing'

const Page: React.FC = props => {
  const [page, setPage] = useState<number>(1)
  const [res, setRes] = useState<Hentai[]>([])
  const [maxPage, setMaxPage] = useState<number>(5)
  
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const [, setSubtitle] = useContext(Subtitle)

  const renderPage = async (page: number) => {
    setLoading(true)
    try {
      const res = await getSearch('-thisisrandomstringtomakesurethatthereisnoanytagbeingexcluded', page)
      console.log('response', res)
      setPage(page)
      setMaxPage(res.maxPage)
      setRes(res.raw)
    } catch (e) {
      setError('Unable to retrieve data from server')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setSubtitle('home')
    renderPage(1)
  }, [])

  return (
    <React.Fragment>
      {loading ? (
        <div className='pt-12 text-gray-900 dark:text-white'>
          <div className='spinner pb-6'></div>
          <div className='text-center pt-4'>Loading...</div>
        </div>
      ) : error !== null ? (
        <div className='pt-12 text-center'>
          <div className='text-xl font-semibold text-gray-900 dark:text-white'>Failed</div>
          <div className='text-gray-600 dark:text-gray-500'>{error}</div>
        </div>
      ) : res.length === 0 ? (
        <div className='pt-12 text-center'>
          <div className='text-xl font-semibold text-gray-900 dark:text-white'>No result</div>
          <div className='text-gray-600 dark:text-gray-500'>No any result related to the query</div>
        </div>
      ) : (
        <React.Fragment>
          <Pagination
            current={page}
            max={maxPage}
            link={false}
            onChange={page => renderPage(page)}
          />
          <Listing raw={res} />
          <Pagination
            current={page}
            max={maxPage}
            link={false}
            onChange={page => renderPage(page)}
          />
        </React.Fragment>
      )}
    </React.Fragment>
  )
}

export default Page
