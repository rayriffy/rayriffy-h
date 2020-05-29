import React, { useEffect } from 'react'

import { Helmet } from 'react-helmet'

import { sortBy } from 'lodash-es'

import { useStoreon } from '../../../../store'

import { TransparentLink } from '../../../../core/components/transparentLink'

import { Props } from '../@types/Props'

const Page: React.FC<Props> = props => {
  const { prefix, raw, subtitle } = props.pageContext

  const { dispatch } = useStoreon('subtitle')

  const alphabet = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
  ]

  const processedTags = sortBy(
    raw.map(o => ({ id: o.id, name: o.name })),
    o => o.name
  )

  useEffect(() => {
    dispatch('subtitle/setSubtitle', subtitle)
  }, [])

  return (
    <React.Fragment>
      <Helmet title='Tags' />
      <div className='flex justify-center'>
        <div className='w-11/12 md:w-8/12 lg:w-6/12'>
          {alphabet.map(character => {
            const filteredTags = processedTags.filter(o => o.name.startsWith(character))

            return filteredTags.length !== 0 ? (
              <div className='py-3' key={`tag-${prefix}-${character}`}>
                <div className='p-5 rounded text-gray-700 bg-white dark:text-gray-200 dark:bg-gray-800'>
                  <div className='text-2xl font-semibold text-gray-900 dark:text-white focus:outline-none focus:shadow-outline'>
                    {character.toLocaleUpperCase()}
                  </div>
                  <div className='py-2'>
                    {filteredTags.map((tag, i) => {
                      return (
                        <div key={`tag-${prefix}-${character}-${tag.id}`}>
                          {i !== 0 ? <hr className='border-gray-400 dark:border-gray-600' /> : null}
                          <div className='py-3'>
                            <TransparentLink
                              to={`/${prefix}/${tag.id}`}
                              aria-label={tag.name}>
                              <div className='text-md text-blue-500'>
                                {tag.name}
                              </div>
                            </TransparentLink>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            ) : null
          })}
        </div>
      </div>
    </React.Fragment>
  )
}

export default Page
