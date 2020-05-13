import React, { useEffect, useState } from 'react'

import { fetch } from '@rayriffy-h/fetch'
import { APIResponse } from '@rayriffy-h/helper'

import { ReaderAPIProps } from '../../@types'

// const LoadContainer = styled(Flex)<{ border: string }>(props => ({
//   position: 'relative',
//   width: '100%',
//   paddingTop: '100%',
//   overflow: 'hidden',
//   borderRadius: 10,
//   border: `1px solid ${props.border}`,
// }))

// const LoadContent = styled(Box)(() => ({
//   position: 'absolute',
//   top: 0,
//   left: 0,
//   bottom: 0,
//   right: 0,
// }))

const Component: React.FC<ReaderAPIProps> = props => {
  const { id } = props

  const [image, setImage] = useState<string>('')
  const [error, setError] = useState<boolean>(false)

  useEffect(() => {
    fetch<APIResponse<string>>(`https://h.api.rayriffy.com/v1/encode/${id}`)
      .then(res => {
        setImage(res.response.data)
      })
      .catch(() => {
        setError(true)
      })
  })

  return (
    <div className='text-gray-900 dark:text-white px-6 py-4'>
      <div className='flex pb-4'>
        <div className='text-2xl font-semibold'>Share</div>
        <div className='mx-auto' />
        <div>x</div>
      </div>
      {image === '' ? (
        <div className='py-8'>
          <div className='spinner' />
          <div className='pt-8 text-center'>Loading...</div>
        </div>
      ) : (
        <div className='py-0'>
          <div className='flex justify-center'>
            <div className='w-8/12 md:w-6/12 lg:w-4/12 rounded overflow-hidden'>
              <img src={image} className='w-full' alt='cover' />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export const API = React.memo(Component)
