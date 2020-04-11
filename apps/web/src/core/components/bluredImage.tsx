import React, { useContext } from 'react'

import LazyLoad from 'react-lazyload'

import styled from '@emotion/styled'

import { Settings } from '../../store'

import { IBluredImageProps } from '../@types'

interface IImageCoverProps {
  blur: boolean
}

const ImageCover = styled('img')<IImageCoverProps>`
  width: 100%;
  margin: 0;

  ${(props: IImageCoverProps) => props.blur && `filter: blur(15px);`}
`

const Component: React.FC<IBluredImageProps> = props => {
  const { height, src, alt } = props

  const { 0: settings } = useContext(Settings)

  return (
    <LazyLoad height={height}>
      <ImageCover blur={settings.safemode} src={src} alt={alt} height='100%' />
    </LazyLoad>
  )
}

export const BluredImage = React.memo(Component)
