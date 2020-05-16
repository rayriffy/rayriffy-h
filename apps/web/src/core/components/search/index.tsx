import React, { useEffect, useState } from 'react'

import { chunk, get } from 'lodash-es'

import { getSearch, rawHentaiToHentai } from '@rayriffy-h/helper'

import * as searchHentaiWorker from '../../services/worker/searchHentai.worker'

import { Listing } from '../listing'
import { Pagination } from './pagination'

import { Hentai } from '@rayriffy-h/helper'
import { SearchProps } from '../../@types'

export const Search: React.FC<SearchProps> = props => {
  const { raw, skip, showOnEmptyQuery = false, modeLock } = props

  const [input, setInput] = useState<string>('')
  const [query, setQuery] = useState<string>('')
  const [first, setFirst] = useState<boolean>(true)
  const [res, setRes] = useState<Hentai[]>(showOnEmptyQuery ? raw : [])

  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const [page, setPage] = useState<number>(1)
  const [maxPage, setMaxPage] = useState<number>(5)
  const [renderedRaw, setRenderedRaw] = useState<Hentai[]>([])

  const [mode, setMode] = useState<'list' | 'nh'>(modeLock === undefined ? 'list' : modeLock)

  const { searchHentai } =
    typeof window === 'object'
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ? ((searchHentaiWorker as any)() as typeof searchHentaiWorker)
      : { searchHentai: null }

  const renderPage = async (raws: Hentai[], page: number) => {
    if (mode === 'list') {
      setPage(page)
      console.log('chunk', chunk(raws, skip))
      console.log('get chunk', get(chunk(raws, skip), page - 1, []))
      setRenderedRaw(get(chunk(raws, skip), page - 1, []))
    } else if (mode === 'nh') {
      setLoading(true)
      const res = await getSearch(query, page)
      setRenderedRaw(res.raw)
      setLoading(false)
    }
  }

  const searchHandler = async () => {
    if (input === '') {
      setQuery('')
      setRes(showOnEmptyQuery && mode === 'list' ? raw : [])
    } else {
      setLoading(true)
      setFirst(false)
      setQuery(input)

      if (mode === 'list') {
        const res = await searchHentai(query, raw)
        setMaxPage(chunk(res, skip).length)
        setRes(res)
      } else if (mode === 'nh') {
        const res = await getSearch(input, 1)
        setMaxPage(res.maxPage)
        setRes(res.raw)

        // Manually render first page
        setPage(1)
        setRenderedRaw(res.raw)
      }

      setLoading(false)
    }
  }

  useEffect(() => {
    if (res.length !== 0 && mode === 'list') {
      setPage(1)
      renderPage(res, 1)
    }
  }, [res])

  useEffect(() => {
    setRes(showOnEmptyQuery && mode === 'list' ? raw : [])
    setFirst(true)
  }, [mode])

  return (
    <React.Fragment>
      <div className='flex justify-center pt-3'>
        <div className='w-10/12 md:w-9/12 lg:w-7/12 xl:w-5/12'>
          <div className='flex justify-center items-center'>
            <input
              className='bg-white dark:bg-gray-900 focus:outline-none focus:shadow-outline border border-gray-300 dark:border-gray-600 rounded py-2 px-4 block w-full appearance-none leading-normal text-gray-900 dark:text-white'
              type='search'
              placeholder='Search'
              value={query}
              onChange={e => {
                const value = e.target.value
                setInput(value)
              }} />
              <div className='px-2' />
              <button className='bg-blue-500 hover:bg-blue-700 w-12 h-10 rounded text-white' onClick={searchHandler}>
                <i className='fas fa-search'></i>
              </button>
            </div>
            {modeLock === undefined ? (
              <div className='pt-4'>
                <div className='border border-gray-600 dark:border-gray-600 rounded flex overflow-hidden'>
                  <div
                    className={`border-r border-gray-600 dark:border-gray-600 w-1/2 py-2 px-4 cursor-pointer flex justify-center items-center ${mode === 'list' ? 'text-gray-200 dark:text-gray-900 bg-gray-600 dark:bg-gray-300': 'text-gray-600 dark:text-gray-300 bg-gray-200 dark:bg-gray-900'}`}
                    onClick={() => setMode('list')}>
                    Listing
                  </div>
                  <div
                    className={`w-1/2 py-2 px-4 cursor-pointer flex justify-center items-center ${mode === 'nh' ? 'text-gray-200 dark:text-gray-900 bg-gray-600 dark:bg-gray-300': 'text-gray-600 dark:text-gray-300 bg-gray-200 dark:bg-gray-900'}`}
                    onClick={() => setMode('nh')}>
                    NHentai
                  </div>
                </div>
              </div>
            ) : null}
        </div>
      </div>
      <div className='pt-4'>
        {loading ? (
          <div className='pt-12 text-gray-900 dark:text-white'>
            <div className='spinner pb-6'></div>
            <div className='text-center pt-4'>Loading...</div>
          </div>
        ) : error !== null ? (
          <div className='pt-12 text-gray-900 dark:text-white text-center'>
            <div className='text-xl pt-4 font-semibold'>Failed</div>
            <div className='pt-4'>{error}</div>
          </div>
        ) : first || query === '' ? (
          <div className='pt-12 text-center'>
            <div className='text-xl font-semibold text-gray-900 dark:text-white'>Search</div>
            <div className='text-gray-500 dark:text-gray-500'>Type your query in the box and search!</div>
          </div>
        ) : res.length === 0 ? (
          <div className='pt-12 text-center'>
            <div className='text-xl font-semibold text-gray-900 dark:text-white'>No result</div>
            <div className='text-gray-500 dark:text-gray-500'>No any result related to the query</div>
          </div>
        ) : (
          <React.Fragment>
            <Pagination
              current={page}
              max={maxPage}
              onChange={page => renderPage(res, page)}
            />
            <Listing raw={renderedRaw} />
            <Pagination
              current={page}
              max={maxPage}
              onChange={page => renderPage(res, page)}
            />
          </React.Fragment>
        )}
      </div>
    </React.Fragment>
  )
}

//   return (
//     <React.Fragment>
//       <Flex justifyContent='center' pt={3}>
//         <Flex
//           width={[20 / 24, 16 / 24, 12 / 24, 8 / 24]}
//           justifyContent='center'>
//           <Input
//             placeholder='Search'
//             value={query}
//             onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
//               setQuery(e.target.value)
//             }
//             color={colorMode === 'dark' ? 'white' : undefined}
//             _placeholder={{
//               color: colorMode === 'dark' ? 'white' : 'gray.500',
//             }}
//             onKeyDown={(e: { key: string }) =>
//               e.key === 'Enter' ? searchButtonHandler() : null
//             }
//           />
//           <Box mx={2} />
//           <IconButton
//             aria-label='Search'
//             icon='search'
//             variantColor='blue'
//             onClick={() => searchButtonHandler()}
//           />
//         </Flex>
//       </Flex>
//       <Flex justifyContent='center'>
//         <Box width={22 / 24}>
//           {isEmpty(res) ? (
//             <Heading size='lg' textAlign='center' pt={6}>
//               No result
//             </Heading>
//           ) : (
//             <React.Fragment>
//               <Flex justifyContent='center'>
//                 <Box width={18 / 24} py={6}>
//                   <Pagination
//                     current={page}
//                     max={chunk(res, skip).length}
//                     onChange={page => renderPage(res, page)}
//                   />
//                 </Box>
//               </Flex>
//               <Flex justifyContent='center'>
//                 <Flex width={22 / 24} flexWrap='wrap' alignItems='center'>
//                   {renderedRaw.map(hentai => (
//                     <Poster key={`poster-${hentai.id}`} raw={hentai} />
//                   ))}
//                 </Flex>
//               </Flex>
//               <Flex justifyContent='center'>
//                 <Box width={18 / 24} py={6}>
//                   <Pagination
//                     current={page}
//                     max={chunk(res, skip).length}
//                     onChange={page => renderPage(res, page)}
//                   />
//                 </Box>
//               </Flex>
//             </React.Fragment>
//           )}
//         </Box>
//       </Flex>
//     </React.Fragment>
//   )
