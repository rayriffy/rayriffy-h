import React from 'react'

interface Props {
  max: number
  current: number
  onChange(page: number): void
}

const Component: React.FC<Props> = props => {
  const { max, current, onChange } = props

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
    <div className='flex justify-center md:py-3 lg:py-5'>
      {Array.from({ length: pageLength }, (_, i) => (
        <div key={`pagination-${startPoint + i}`} className='px-3'>
          <div
            className={`cursor-pointer ${startPoint + i + 1 === current ? 'text-gray-900 dark:text-white' : 'text-gray-500'}`}
            onClick={() => onChange(startPoint + i + 1)}>
            {startPoint + i + 1}
          </div>
        </div>
      ))}
    </div>
  )
}

export const Pagination = React.memo(Component)
