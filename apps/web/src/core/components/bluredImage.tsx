import React, { useContext } from 'react'

import { LazyLoadImage, LazyLoadImageProps } from 'react-lazy-load-image-component'

import { Settings } from '../../store'

export const BluredImage: React.FC<LazyLoadImageProps> = props => {
  const { className, ...rest } = props
  const { 0: settings } = useContext(Settings)

  return (
    <LazyLoadImage
      className={`${settings.safemode ? 'filter-blur scale-110' : 'filter-none scale-0'} transition-all duration-300 ease-in-out m-0 w-full ${className}`}
      {...rest}
    />
  )
}
