import React from 'react'

interface ModalProps {
  isOpen: boolean
  onClose?: () => void
}

export const Modal: React.FC<ModalProps> = props => {
  const { isOpen, children, onClose } = props

  return (
    <div className={`absolute w-full h-full top-0 left-0 flex items-center justify-center ${!isOpen ? 'opacity-0 pointer-events-none' : ''}`}>
      <div className={`absolute w-full h-full bg-black opacity-25 top-0 left-0`} onClick={() => onClose ? onClose() : null}></div>
      <div className="absolute w-1/2 h-32 bg-white rounded-sm shadow-lg flex items-center justify-center text-2xl">
        {children}
      </div>
    </div>
  )
}
