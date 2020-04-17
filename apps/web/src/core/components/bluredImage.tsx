import React, { useContext } from 'react'

import { LazyLoadImage, LazyLoadImageProps } from 'react-lazy-load-image-component'

import styled from '@emotion/styled'

import { Settings } from '../../store'

interface ImageCoverProps {
  blur: boolean
}

const ImageCover = styled(LazyLoadImage)<ImageCoverProps>(props => ({
  margin: 0,
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
