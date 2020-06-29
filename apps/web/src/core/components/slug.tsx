import React from 'react'

import { TransparentLink } from './transparentLink'

import { SlugProps } from '../@types/SlugProps'

const Component: React.FC<SlugProps> = props => {
  const { color = 'grey', link, title } = props

  const badge: React.ReactNode = (
    <span
      className={`flex rounded bg-${color}-500 uppercase p-1 text-xs font-bold text-white select-none`}
    >
      {title}
    </span>
  )

  return (
    <div className="p-1">
      {link ? (
        <TransparentLink to={link} aria-label={title}>
          {badge}
        </TransparentLink>
      ) : (
        badge
      )}
    </div>
  )
}

export const Slug = React.memo(Component)
