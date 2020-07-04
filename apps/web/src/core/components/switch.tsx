import React, { useRef, useState, useEffect } from 'react'

import { SwitchProps } from '../@types/SwitchProps'

export const Switch: React.FC<SwitchProps> = props => {
  const { checked = false, onChange, className = '' } = props

  const [on, setOn] = useState(checked)

  const mounted = useRef(false)
  useEffect(() => {
    if (mounted.current) {
      if (onChange) onChange(on)
    } else {
      mounted.current = true
    }
  }, [on])

  return (
    <div className={className}>
      <span
        className={`border rounded-full border-grey flex items-center cursor-pointer w-8 h-4 transition-colors duration-200${
          on ? ' bg-green-600' : ''
        }`}
        onClick={() => setOn(o => !o)}
      >
        <span
          className={`rounded-full border w-4 h-4 border-grey shadow-inner bg-white shadow transition-transform duration-200 transform ${
            on ? 'translate-x-4' : ''
          }`}
        ></span>
      </span>
    </div>
  )
}
