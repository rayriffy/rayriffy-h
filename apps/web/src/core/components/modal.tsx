import React from 'react'

interface ModalProps {
  title?: React.ReactText
  isOpen: boolean
  onClose?: () => void
}

export const Modal: React.FC<ModalProps> = props => {
  const { isOpen, children, onClose, title } = props

  return (
    <div
      className={`absolute w-full h-full top-0 left-0 flex items-center justify-center ${
        !isOpen ? 'opacity-0 pointer-events-none' : ''
      } transition-all duration-200 z-40`}
    >
      <div
        className={`absolute w-full h-full bg-black opacity-50 top-0 left-0`}
        onClick={() => (onClose ? onClose() : null)}
      ></div>
      <div className="absolute w-10/12 md:w-8/12 lg:w-6/12 xl:4/12 max-w-xl h-auto rounded shadow-lg bg-white dark:bg-gray-800 z-50 text-gray-900 dark:text-white px-6 py-4">
        <div className="flex pb-4 items-center">
          <div className="text-2xl font-semibold">{title}</div>
          <div className="mx-auto" />
          <div
            className="w-8 h-8 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 rounded flex justify-center items-center"
            onClick={() => (onClose ? onClose() : null)}
          >
            <i className="fas fa-times"></i>
          </div>
        </div>
        {isOpen ? children : null}
      </div>
    </div>
  )
}
