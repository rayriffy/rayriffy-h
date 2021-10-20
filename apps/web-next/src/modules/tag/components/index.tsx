import { FunctionComponent } from 'react'

import { Hentai } from '@rayriffy-h/helper'
import { ExclamationIcon, QuestionMarkCircleIcon } from '@heroicons/react/outline'

import { Listing } from '../../../core/components/listing'
import { Pagination } from '../../../core/components/pagination'

interface IProps {
  tagName: string
  galleries: Hentai[]
  maxPage: number
  currentPage: number
}

export const TagModule: FunctionComponent<IProps> = props => {
  const { tagName, galleries, maxPage, currentPage } = props

  return (
    <div className="p-2 sm:p-4">
      <div className="flex justify-center pt-4">
        <nav className="z-0">
          <Pagination
            max={maxPage}
            current={currentPage}
            prefix={`/tag/${tagName}/`}
          />
        </nav>
      </div>
      <div className="py-4">
        <Listing {...{ galleries }} />
      </div>
      <div className="flex justify-center pb-4">
        <nav className="z-0">
          <Pagination
            max={maxPage}
            current={currentPage}
            prefix={`/tag/${tagName}/`}
          />
        </nav>
      </div>
    </div>
  )
}
