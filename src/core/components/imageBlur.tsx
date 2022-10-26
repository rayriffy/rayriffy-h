import { memo, ComponentProps } from 'react'

import Image from 'next/image'

import { useStoreon } from '../../context'

export const ImageBlur = memo<ComponentProps<typeof Image>>(props => {
  const { className = '', ...rest } = props
  const { settings } = useStoreon('settings')

  return (
    <div
      className={`${className} flex overflow-hidden ${
        settings.safemode ? 'blur-lg transform scale-105' : ''
      }`}
    >
      <Image {...rest} />
    </div>
  )
})
