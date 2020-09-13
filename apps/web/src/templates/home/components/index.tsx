import React, { useState, useEffect } from 'react'

import { getSearch, Hentai } from '@rayriffy-h/helper'

import { useStoreon } from '../../../store'

import { Pagination } from '../../../core/components/pagination'
import { Listing } from '../../../core/components/listing'

interface Props {
  page: number
}

const Component: React.FC<Props> = props => {
  const { page } = props

  const [res, setRes] = useState<Hentai[]>([])
  const [maxPage, setMaxPage] = useState<number>(5)

  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const { dispatch } = useStoreon('subtitle')

  // console.log(res)

  const renderPage = async (page: number) => {
    setLoading(true)
    try {
      const res = await getSearch(
        '-thisisrandomstringtomakesurethatthereisnoanytagbeingexcluded',
        page
      )

      if (res.raw === undefined || res.maxPage === undefined) throw 'api-crash'

      setMaxPage(res.maxPage)
      setRes(res.raw)
    } catch (e) {
      setError(`Unable to retrieve page ${page} from server`)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    dispatch('subtitle/setSubtitle', 'home')
    renderPage(page)
  }, [page])

  return loading ? (
    <div className="pt-12 text-gray-900 dark:text-white">
      <div className="spinner pb-6"></div>
      <div className="text-center pt-4">Loading...</div>
    </div>
  ) : error !== null ? (
    <div className="pt-12 text-center">
      <div className="text-xl font-semibold text-gray-900 dark:text-white">
        Failed
      </div>
      <div className="text-gray-600 dark:text-gray-500">{error}</div>
      <div className="pt-4 mx-auto max-w-sm text-sm text-gray-600 dark:text-gray-500">
        This error could caused by NHentai API itself and it usually take a few
        hours to be fixed. In meanwhile, you can explore other galleries in
        "Listing" section
      </div>
    </div>
  ) : res.length === 0 ? (
    <div className="pt-12 text-center">
      <div className="text-xl font-semibold text-gray-900 dark:text-white">
        No result
      </div>
      <div className="text-gray-600 dark:text-gray-500">
        No any result related to the query
      </div>
    </div>
  ) : (
    <React.Fragment>
      <Pagination current={page} max={maxPage} prefix={'/'} />
      <Listing
        raw={res.map(o => ({
          raw: o,
          internal: false,
        }))}
      />
      <Pagination current={page} max={maxPage} prefix={'/'} />
    </React.Fragment>
  )
}

export const Home = React.memo(Component)
