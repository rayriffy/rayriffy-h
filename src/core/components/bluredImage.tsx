import React, { useContext } from 'react'

import LazyLoad from 'react-lazyload'

import { Image } from 'rebass'
import styled from 'styled-components'

import { SafeMode } from '../../app/context'

import { IBluredImageProps } from '../@types/IBluredImageProps'

interface IImageCoverProps {
  blur: boolean
}

const ImageCover = styled(Image)`
  overflow: hidden;
  width: 100%;

  ${(props: IImageCoverProps) => props.blur && `filter: blur(15px);`}
`

const BluredImageComponent: React.FC<IBluredImageProps> = props => {
  const {height, src} = props

  const [safeMode] = useContext(SafeMode)

  return (
    <LazyLoad height={height}>
      <ImageCover blur={safeMode === undefined ? true : safeMode} src={src} />
    </LazyLoad>
  )
}

export default React.memo(BluredImageComponent)
