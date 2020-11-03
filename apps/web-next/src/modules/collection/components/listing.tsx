import React, { useMemo, useState } from 'react'

import { useStoreon } from '@rayriffy-h/state-engine'
import { itemsPerPage } from '@rayriffy-h/constants'

import { chunk } from 'lodash'

import { Pagination } from 'apps/web-next/src/core/components/pagination'
import { Listing } from 'apps/web-next/src/core/components/listing'

export const CollectionListing: React.FC = React.memo(props => {
  const { collection } = useStoreon('collection')

  const [page, setPage] = useState<number>(1)
  const maxPage = useMemo(() => chunk(collection.data, itemsPerPage).length, [
    collection,
  ])
  const galleries = useMemo(
    () =>
      (chunk(collection.data, itemsPerPage)[page - 1] ?? []).map(o => o.data),
    [page, collection]
  )

  return (
    <React.Fragment>
      <div className="flex justify-center pt-4">
        <nav className="z-0">
          <Pagination
            max={maxPage}
            current={page}
            link={false}
            onChange={page => setPage(page)}
          />
        </nav>
      </div>
      <div className="py-4">
        <Listing {...{ galleries: galleries }} />
      </div>
      <div className="flex justify-center pb-4">
        <nav className="z-0">
          <Pagination
            max={maxPage}
            current={page}
            link={false}
            onChange={page => setPage(page)}
          />
        </nav>
      </div>
    </React.Fragment>
  )
})
