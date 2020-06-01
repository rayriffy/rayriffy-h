import React, { useState } from 'react'

import { useStoreon } from '../../../store'

import { Modal } from '../../../core/components/modal'
import { ModalExport } from './modal/export'
import { ModalImport } from './modal/import'
import { ModalReset } from './modal/reset'

export const Actions: React.FC = props => {
  const { collection } = useStoreon('collection')

  const [menuOpen, setMenuOpen] = useState<boolean>(false)
  const [activeModal, setActiveModal] = useState<'none' | 'import' | 'export' | 'reset'>('none')

  return (
    <React.Fragment>
      <div className='pt-0 md:pt-4 px-0 md:px-6 flex items-center text-gray-900 dark:text-white'>
        <div
          className='bg-white hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 px-4 py-2 rounded cursor-pointer font-semibold select-none'
          onClick={() => setMenuOpen(o => !o)}>
          Actions <i className='ml-1 fas fa-angle-down'></i>
        </div>
        <div className='ml-4 font-semibold'>{collection.data.length} Items</div>
      </div>
      <div className='px-0 md:px-6 relative'>
        {menuOpen && activeModal === 'none' ? (
          <div className='absolute mt-4 bg-white dark:bg-gray-800 rounded overflow-hidden w-2/5 max-w-xs text-gray-900 dark:text-white py-2 z-40'>
            <div className='cursor-pointer px-6 py-2 hover:bg-gray-300 dark:hover:bg-gray-700' onClick={() => setActiveModal('import')}>Import</div>
            <div className='cursor-pointer px-6 py-2 hover:bg-gray-300 dark:hover:bg-gray-700' onClick={() => setActiveModal('export')}>Export</div>
            <div className='cursor-pointer px-6 py-2 hover:bg-gray-300 dark:hover:bg-gray-700 border-t border-gray-300 dark:border-gray-700' onClick={() => setActiveModal('reset')}>Reset</div>
          </div>
        ) : null}
      </div>
      <Modal
        title='Import'
        isOpen={activeModal === 'import'} 
        onClose={() => {
          setMenuOpen(false)
          setActiveModal('none')
        }}>
        <ModalImport
          onClose={() => {
            setMenuOpen(false)
            setActiveModal('none')
          }} />
      </Modal>
      <Modal
        title='Export'
        isOpen={activeModal === 'export'} 
        onClose={() => {
          setMenuOpen(false)
          setActiveModal('none')
        }}>
        <ModalExport
          onClose={() => {
            setMenuOpen(false)
            setActiveModal('none')
          }} />
      </Modal>
      <Modal
        title='Reset'
        isOpen={activeModal === 'reset'} 
        onClose={() => {
          setMenuOpen(false)
          setActiveModal('none')
        }}>
        <ModalReset
          onClose={() => {
            setMenuOpen(false)
            setActiveModal('none')
          }} />
      </Modal>
    </React.Fragment>
  )
}
