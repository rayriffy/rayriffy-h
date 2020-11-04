import React from 'react'

import { Exclamation, QuestionMarkCircle } from '@rayriffy-h/icons'

import { Listing } from '../../../core/components/listing'
import { Pagination } from '../../../core/components/pagination'
import { useMainNavigation } from '../services/useMainNavigation'

interface IProps {
  page: number
}

export const MainListing: React.FC<IProps> = props => {
  const { page } = props

  const { data, isLoading, isError } = useMainNavigation(page)

  if (isLoading) {
    return (
      <div className="pt-16">
        <div className="flex justify-center">
          <div className="w-8 h-8 spinner border-2" />
        </div>
        <div className="pt-4">
          <p className="font-bold text-lg text-gray-800 text-center">
            Obtaining data
          </p>
          <p className="text-sm text-gray-800 text-center">
            This should take only few seconds...
          </p>
        </div>
      </div>
    )
  } else if (isError || !data) {
    return (
      <div className="pt-16 max-w-xl mx-auto">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
          <Exclamation className="h-6 w-6 text-red-600" />
        </div>
        <div className="pt-4">
          <p className="font-bold text-lg text-gray-800 text-center">Failed</p>
          <p className="text-sm text-gray-800 text-center">
            This error could caused by NHentai API itself and it usually take a
            few hours to be fixed. In meanwhile, you can explore other galleries
            in "Listing" section
          </p>
        </div>
      </div>
    )
  } else if (data.galleries.length === 0) {
    return (
      <div className="pt-16 max-w-xl mx-auto">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-orange-100">
          <QuestionMarkCircle className="h-6 w-6 text-orange-600" />
        </div>
        <div className="pt-4">
          <p className="font-bold text-lg text-gray-800 text-center">
            Not Found
          </p>
          <p className="text-sm text-gray-800 text-center">
            No results for this search query / page
          </p>
        </div>
      </div>
    )
  } else {
    return (
      <div className="p-2 sm:p-4">
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
      </div>
    )
  }
}
