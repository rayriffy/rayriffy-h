import React, { useContext } from 'react'

import { LazyLoadImage, LazyLoadImageProps } from 'react-lazy-load-image-component'

import styled from '@emotion/styled'

import { Settings } from '../../store'

interface ImageCoverProps {
  blur: boolean
}

const ImageCover = styled(LazyLoadImage)<ImageCoverProps>(props => ({
  margin: 0,
  transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
  transform: props.blur ? 'scale(1.1)' : 'scale(1.0)',
  filter: props.blur ? 'blur(15px)' : 'blur(0px)'
}))

export const BluredImage: React.FC<LazyLoadImageProps> = props => {
  const { 0: settings } = useContext(Settings)

  return (
    <ImageCover
      blur={settings.safemode}
      {...props}
    />
  )
}
