import React, { useEffect, useState } from 'react'

import { fetch } from '@rayriffy-h/fetch'
import { APIResponse } from '@rayriffy-h/helper'

import { useClipboard } from '../../services/functions/useClipboard'

import { ReaderAPIProps } from '../../@types/ReaderAPIProps'

const Component: React.FC<ReaderAPIProps> = props => {
  const { id } = props

  const [image, setImage] = useState<string>('')
  const [error, setError] = useState<boolean>(false)

  const { onCopy, hasCopied } = useClipboard(id.toString())

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
    <React.Fragment>
      {error ? (
        <div className='py-8'>
          <div className='flex justify-center'>
            <i className='fas fa-exclamation-triangle text-2xl'></i>
          </div>
          <div className='pt-4 text-center'>Failed to load image</div>
        </div>
      ) : image === '' ? (
        <div className='py-8'>
          <div className='spinner' />
          <div className='pt-8 text-center'>Loading...</div>
        </div>
      ) : (
        <div className='py-0'>
          <div className='flex justify-center'>
            <div className='w-8/12 md:w-6/12 rounded overflow-hidden'>
              <img src={image} className='w-full' alt='cover' />
            </div>
          </div>
          <div className='flex pt-6 pb-2 px-8 md:px-16 select-none'>
            <div className='w-1/2 pr-1'>
              <a href={image} download={`encoded-${id}.jpeg`} aria-label='Download'>
                <div className='bg-blue-500 hover:bg-blue-700 rounded py-2 text-white font-semibold text-center cursor-pointer'>Download</div>
              </a>
            </div>
            <div className='w-1/2 pl-1'>
              <div className='bg-teal-500 hover:bg-teal-700 rounded py-2 text-white font-semibold text-center cursor-pointer' onClick={onCopy}>
                {hasCopied ? 'Copied' : 'Copy ID'}
              </div>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  )
}

export const API = React.memo(Component)
