import React, { useState } from 'react'

import AnimateHeight from 'react-animate-height'

import { ReaderCollapseProps } from '../../@types/ReaderCollapseProps'

export const Collapse: React.FC<ReaderCollapseProps> = props => {
  const { defaultState = false, title, children } = props

  const { 0: isShow, 1: setIsShow } = useState(defaultState)

  return (
    <React.Fragment>
      <div
        className='text-gray-900 dark:text-white text-md px-4 py-2 capitalize cursor-pointer bg-gray-200 dark:bg-gray-700 font-semibold rounded-lg flex justify-between items-center hover:bg-gray-300 dark:hover:bg-gray-600 select-none'
        onClick={() => setIsShow(prev => !prev)}>
        {title}
        <i className={`fas fa-angle-${isShow ? 'down' : 'up'}`}></i>
      </div>
      <div className='px-2 pt-2'>
        <AnimateHeight
          easing='ease-in-out'
          animateOpacity={true}
          height={isShow ? 'auto' : 0}
          applyInlineTransitions={false}
          className='transition-all duration-200 ease-in-out'>
          {children}
        </AnimateHeight>
      </div>
    </React.Fragment>
  )
}
