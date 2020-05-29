import React, { useState } from 'react'

import { useStoreon } from '../../../store'

import { API } from './api'
import { Modal } from '../modal'

import { ReaderShareProps } from '../../@types/ReaderShareProps'

const Component: React.FC<ReaderShareProps> = props => {
  const { hentai, internal } = props

  const { dispatch, collection } = useStoreon('collection')

  const toggleFavorite = () => {
    const isFavorited =
      collection.data.find(
        o =>
          (Number.isSafeInteger(Number(o.id)) ? Number(o.id) : o.id) ===
          hentai.id
      ) === undefined

    let res = collection.data

    if (!isFavorited) {
      res = res.filter(
        o =>
          (Number.isSafeInteger(Number(o.id)) ? Number(o.id) : o.id) !==
          hentai.id
      )
    } else {
      res = [
        {
          id: hentai.id,
          internal,
          data: { ...hentai, images: { ...hentai.images, pages: [] } },
        },
        ...res,
      ]
    }

    dispatch('collection/override', {
      collection: {
        ...collection,
        data: res,
      },
    })
  }

  const [isOpen, setIsOpen] = useState(false)

  return (
    <React.Fragment>
      <div className='flex items-center justify-center'>
        <div className='px-4'>
          <div className='rounded bg-pink-500 hover:bg-pink-700 cursor-pointer text-white w-10 h-10 flex justify-center items-center' onClick={toggleFavorite}>
            <i className={`fas fa-${collection.data.find(o => Number(o.id) === Number(hentai.id)) === undefined ? 'plus' : 'minus'}`}></i>
          </div>
        </div>
        <div className='px-4'>
          <div className='rounded bg-blue-500 hover:bg-blue-700 cursor-pointer text-white w-10 h-10 flex justify-center items-center' onClick={() => setIsOpen(o => !o)}>
            <i className='fas fa-share-alt'></i>
          </div>
        </div>
        <div className='px-4'>
          <a href={`https://nhentai.net/g/${hentai.id}`} target='_blank' rel='noopener noreferrer'>
            <div className='rounded bg-orange-500 hover:bg-orange-700 cursor-pointer text-white w-10 h-10 flex justify-center items-center'>
              <i className='fas fa-external-link-square-alt'></i>
            </div>
          </a>
        </div>
      </div>
      <Modal isOpen={isOpen} title='Share' onClose={() => setIsOpen(o => !o)}>
        <API id={hentai.id} />
      </Modal>
    </React.Fragment>
  )
}

export const Share = React.memo(Component)
