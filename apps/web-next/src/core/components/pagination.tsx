import React from 'react'

import Link from 'next/link'

interface Props {
  max: number
  current: number
  prefix?: string
  link?: boolean
  onChange?(page: number): void
}

interface PageProps {
  startPoint: number
  current: number
  i: number
  onChange(page: number): void
}

const Page: React.FC<PageProps> = props => {
  const { startPoint, current, i, onChange } = props

  return (
    <div
      className={`cursor-pointer ${
        startPoint + i + 1 === current ? 'text-gray-900' : 'text-gray-500'
      }`}
      onClick={() => onChange(startPoint + i + 1)}
    >
      {startPoint + i + 1}
    </div>
  )
}

export const Pagination: React.FC<Props> = React.memo(props => {
  const { max, current, prefix = '/', link = true, onChange } = props

  const pageLength: number = max > 5 ? 5 : max
  const startPoint: number =
    max > 5
      ? current - 2 < 1
        ? 0
        : current + 2 > max
        ? max - pageLength
        : current - (pageLength - 2)
      : 0

  return (
    <div className="flex justify-center md:py-3 lg:py-5">
      {Array.from({ length: pageLength }, (_, i) => (
        <div
          key={`pagination-${startPoint + i}`}
          className="px-4 text-md sm:text-lg"
        >
          {link ? (
            <Link
              href={
                startPoint + i === 0
                  ? prefix
                  : `${prefix}p/${startPoint + i + 1}`
              }
              aria-label={`${startPoint + i + 1}`}
            >
              <a>
                <Page
                  {...{ startPoint, i, current }}
                  onChange={page => (onChange ? onChange(page) : null)}
                />
              </a>
            </Link>
          ) : (
            <Page
              {...{ startPoint, i, current }}
              onChange={page => (onChange ? onChange(page) : null)}
            />
          )}
        </div>
      ))}
    </div>
  )
})
