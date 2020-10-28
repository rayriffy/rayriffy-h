import React from 'react'

export const ArrowNarrowDown: React.FC<React.SVGProps<
  SVGSVGElement
>> = props => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M16 17l-4 4m0 0l-4-4m4 4V3"
      />
    </svg>
  )
}
