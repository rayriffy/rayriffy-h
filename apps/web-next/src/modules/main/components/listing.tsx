import React from 'react'

import { Listing } from '../../../core/components/listing'
import { Pagination } from '../../../core/components/pagination'
import { useMainNavigation } from '../services/useMainNavigation'

interface IProps {
  page: number
}

export const MainListing: React.FC<IProps> = props => {
  const { page } = props

  const { data, isLoading, isError } = useMainNavigation(page)
  // const res = useMainNavigation(page)

  return (
    <div className="p-2 sm:p-4">
      {isError ? (
        <div>Fail</div>
      ) : isLoading ? (
        <div>Load</div>
      ) : (
        <React.Fragment>
          <div className="flex justify-center pt-4">
            <nav className="z-0">
              <Pagination max={data.maxPage} current={page} prefix="/" />
            </nav>
          </div>
          <div className="py-4">
            <Listing {...{ galleries: data.galleries }} />
          </div>
          <div className="flex justify-center pb-4">
            <nav className="z-0">
              <Pagination max={data.maxPage} current={page} prefix="/" />
            </nav>
          </div>
        </React.Fragment>
      )}
    </div>
  )
}
