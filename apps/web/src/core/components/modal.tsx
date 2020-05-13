import React from 'react'

interface ModalProps {
  isOpen: boolean
  onClose?: () => void
}

export const Modal: React.FC<ModalProps> = props => {
  const { isOpen, children, onClose } = props

  return (
    <div className={`absolute w-full h-full top-0 left-0 flex items-center justify-center ${!isOpen ? 'opacity-0 pointer-events-none' : ''} transition-all duration-200`}>
      <div className={`absolute w-full h-full bg-black opacity-50 top-0 left-0`} onClick={() => onClose ? onClose() : null}></div>
      <div className='absolute w-10/12 md:w-8/12 lg:w-6/12 xl:4/12 h-auto rounded shadow-lg bg-white dark:bg-gray-800'>
        {children}
      </div>
    </div>
  )
}
