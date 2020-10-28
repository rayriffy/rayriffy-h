import React from 'react'

import Image from 'next/image'

import { useStoreon } from '@rayriffy-h/state-engine'

export const ImageBlur: React.FC<React.ComponentProps<
  typeof Image
>> = props => {
  const { className, ...rest } = props
  const { settings } = useStoreon('settings')

  return (
    <Image
      className={`${className} overflow-hidden ${
        settings.safemode ? 'filter-blur transform scale-105' : ''
      }`}
      {...rest}
    />
  )
}
