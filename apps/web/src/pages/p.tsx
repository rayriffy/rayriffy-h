import React, { useEffect, useState } from 'react'

import { isEmpty } from 'lodash-es'
import { navigate } from 'gatsby'

import { Home } from '../templates/home/components'

interface Props {
  location: {
    pathname: string
  }
}

const Page: React.FC<Props> = props => {
  const { location } = props

  const [page, setPage] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const requestedID = location.pathname.split('/')[2]

    if (!isEmpty(requestedID)) {
      if (Number.isSafeInteger(Number(requestedID))) {
        setPage(Number(requestedID))
      } else {
        setError('Page number is not an integer')
      }
    } else {
      navigate(`/`)
    }
  }, [location])

  return error !== null ? (
    <div className="pt-12 text-center">
      <div className="text-xl font-semibold text-gray-900 dark:text-white">
        Failed
      </div>
      <div className="text-gray-600 dark:text-gray-500">{error}</div>
    </div>
  ) : page === null ? (
    <div className="pt-12 text-center">
      <div className="text-xl font-semibold text-gray-900 dark:text-white">
        Parsing
      </div>
      <div className="text-gray-600 dark:text-gray-500">
        Preparing to make a request
      </div>
    </div>
  ) : (
    <Home page={page} />
  )
}

export default Page
