import React, { useContext } from 'react'

import LazyLoad from 'react-lazyload'

import styled from '@emotion/styled'

import { SafeMode } from '../../store'

import { IBluredImageProps } from '../@types/IBluredImageProps'

interface IImageCoverProps {
  blur: boolean
}

const ImageCover = styled('img')<IImageCoverProps>`
  width: 100%;
  margin: 0;

  ${(props: IImageCoverProps) => props.blur && `filter: blur(15px);`}
`

const BluredImageComponent: React.FC<IBluredImageProps> = props => {
  const { height, src, alt } = props

  const [safeMode] = useContext(SafeMode)

  return (
    <LazyLoad height={height}>
      <ImageCover
        blur={safeMode === undefined ? true : safeMode}
        src={src}
        alt={alt}
        height='100%'
      />
    </LazyLoad>
  )
}

export default React.memo(BluredImageComponent)
