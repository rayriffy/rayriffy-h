import React, { useRef, useState } from 'react'

import { fetch } from '@rayriffy-h/fetch'

import { Modal } from '../../../core/components/modal'

import { Collection } from '../../../core/@types/Collection'
import { ActionsProps } from '../@types/ActionsProps'

export const Actions: React.FC<ActionsProps> = props => {
  const { collection, setCollection } = props

  const [menuOpen, setMenuOpen] = useState<boolean>(false)
  const [activeModal, setActiveModal] = useState<'none' | 'import' | 'export' | 'reset'>('none')

  const { 0: exportStat, 1: setExportStat } = useState<
    'wait' | 'load' | string
  >('wait')
  // const { onCopy, hasCopied } = useClipboard(exportStat)


  const { 0: importLoad, 1: setImportLoad } = useState<boolean>(false)
  const { 0: input, 1: setInput } = useState<string>('')

  const exportHandler = async () => {
    try {
      setExportStat('load')

      const res: { key: string } = await fetch<{ key: string }>(
        `https://bytebin.lucko.me/post`,
        {
          credentials: 'same-origin',
          method: 'POST',
          body: JSON.stringify(collection),
          headers: { 'Content-Type': 'application/json' },
        }
      )

      setExportStat(res.key)
    } catch {
      // toast({
      //   title: 'Failed.',
      //   description: 'Unable to export data.',
      //   status: 'error',
      //   duration: 4000,
      //   isClosable: true,
      // })
    }
  }

  const importHandler = async (id: string) => {
    try {
      setImportLoad(true)

      const res = await fetch<Collection>(`https://bytebin.lucko.me/${id}`)

      if (
        typeof res === 'object' &&
        typeof res.version === 'number' &&
        typeof res.data === 'object' &&
        res.data.length !== undefined
      ) {
        setCollection(res)

        setImportLoad(false)
        // importOnClose()
      } else {
        // toast({
        //   title: 'Failed.',
        //   description: 'Invalid format.',
        //   status: 'error',
        //   duration: 4000,
        //   isClosable: true,
        // })

        setImportLoad(false)
        // importOnClose()
      }
    } catch (e) {
      // toast({
      //   title: 'Failed.',
      //   description: 'Unable to import data.',
      //   status: 'error',
      //   duration: 4000,
      //   isClosable: true,
      // })

      setImportLoad(false)
      // importOnClose()
    }
  }

  const resetHandler = async () => {
    setCollection(prev => ({
      ...prev,
      data: [],
    }))
    // resetOnClose()

    // toast({
    //   title: 'Data had been reset.',
    //   description: 'All saved favorites in this device had been removed.',
    //   status: 'success',
    //   duration: 4000,
    //   isClosable: true,
    // })
  }

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
          <div className='absolute mt-4 bg-white dark:bg-gray-800 rounded overflow-hidden max-w-full w-2/5 md:w-1/5 text-gray-900 dark:text-white py-2'>
            <div className='cursor-pointer px-4 py-2 hover:bg-gray-300 dark:hover:bg-gray-700' onClick={() => setActiveModal('import')}>Import</div>
            <div className='cursor-pointer px-4 py-2 hover:bg-gray-300 dark:hover:bg-gray-700' onClick={() => setActiveModal('export')}>Export</div>
            <div className='cursor-pointer px-4 py-2 hover:bg-gray-300 dark:hover:bg-gray-700 border-t border-gray-300 dark:border-gray-700' onClick={() => setActiveModal('reset')}>Reset</div>
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
        OK
      </Modal>
      <Modal
        title='Export'
        isOpen={activeModal === 'export'} 
        onClose={() => {
          setMenuOpen(false)
          setActiveModal('none')
        }}>
        OK
      </Modal>
      <Modal
        title='Reset'
        isOpen={activeModal === 'reset'} 
        onClose={() => {
          setMenuOpen(false)
          setActiveModal('none')
        }}>
        OK
      </Modal>
    </React.Fragment>
  )

  // return (
  //   <React.Fragment>
  //     <Flex justifyContent='center' pt={2}>
  //       <Flex width={22 / 24} alignItems='center'>
  //         <Menu>
  //           <MenuButton as={Button}>
  //             Actions <Icon pl={2} name='chevron-down' />
  //           </MenuButton>
  //           <MenuList>
  //             <MenuItem
  //               onClick={exportOnOpen}
  //               isDisabled={isEmpty(collection.data)}>
  //               Export
  //             </MenuItem>
  //             <MenuItem onClick={importOnOpen}>Import</MenuItem>
  //             <MenuDivider />
  //             <MenuItem onClick={resetOnOpen}>Reset</MenuItem>
  //           </MenuList>
  //         </Menu>
  //         <Heading pl={4} size='sm'>
  //           {collection.data.length} Items
  //         </Heading>
  //       </Flex>
  //     </Flex>

  //     <Modal isOpen={exportIsOpen} onClose={exportOnClose}>
  //       <ModalOverlay />
  //       <ModalContent>
  //         <ModalHeader>Export</ModalHeader>
  //         <ModalBody>
  //           {exportStat !== 'wait' && exportStat !== 'load' ? (
  //             <React.Fragment>
  //               Your export key is: <b>{exportStat}</b>
  //               <br />
  //               This key will expire in 1 hour.
  //             </React.Fragment>
  //           ) : (
  //             <React.Fragment>
  //               Your collection will be available to import for <b>1 hour</b>.
  //               <br />
  //               Are you sure to do that?
  //             </React.Fragment>
  //           )}
  //         </ModalBody>

  //         <ModalFooter>
  //           {exportStat === 'wait' || exportStat === 'load' ? (
  //             <Button
  //               variantColor='blue'
  //               mr={3}
  //               onClick={exportHandler}
  //               isLoading={exportStat === 'load'}>
  //               Export
  //             </Button>
  //           ) : (
  //             <Button variant='ghost' mr={3} onClick={onCopy}>
  //               {hasCopied ? 'Copied' : 'Copy'}
  //             </Button>
  //           )}
  //           <Button
  //             variant={
  //               exportStat !== 'wait' && exportStat !== 'load'
  //                 ? undefined
  //                 : 'ghost'
  //             }
  //             variantColor={
  //               exportStat !== 'wait' && exportStat !== 'load'
  //                 ? 'blue'
  //                 : undefined
  //             }
  //             onClick={exportOnClose}
  //             isDisabled={exportStat === 'load'}>
  //             {exportStat !== 'wait' && exportStat !== 'load'
  //               ? 'Done'
  //               : 'Cancel'}
  //           </Button>
  //         </ModalFooter>
  //       </ModalContent>
  //     </Modal>

  //     <Modal isOpen={importIsOpen} onClose={importOnClose}>
  //       <ModalOverlay />
  //       <ModalContent>
  //         <ModalHeader>Import</ModalHeader>
  //         <ModalBody>
  //           Enter import key here
  //           <Box py={2}>
  //             <Input
  //               value={input}
  //               onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
  //                 setInput(e.target.value)
  //               }
  //               placeholder='Type here'
  //               isDisabled={importLoad}
  //               color={colorMode === 'dark' ? 'white' : undefined}
  //               _placeholder={{
  //                 color: colorMode === 'dark' ? 'gray.300' : 'gray.500',
  //               }}
  //             />
  //           </Box>
  //         </ModalBody>

  //         <ModalFooter>
  //           <Button
  //             variantColor='blue'
  //             mr={3}
  //             isLoading={importLoad}
  //             onClick={() => importHandler(input)}>
  //             Import
  //           </Button>
  //           <Button
  //             variant='ghost'
  //             onClick={importOnClose}
  //             isDisabled={importLoad}>
  //             Cancel
  //           </Button>
  //         </ModalFooter>
  //       </ModalContent>
  //     </Modal>

  //     <AlertDialog
  //       isOpen={resetIsOpen}
  //       leastDestructiveRef={resetCancelRef}
  //       onClose={resetOnClose}>
  //       <AlertDialogOverlay />
  //       <AlertDialogContent>
  //         <AlertDialogHeader fontSize='lg' fontWeight='bold'>
  //           Delete Customer
  //         </AlertDialogHeader>

  //         <AlertDialogBody>
  //           Are you sure? You can't undo this action afterwards.
  //         </AlertDialogBody>

  //         <AlertDialogFooter>
  //           <Button ref={resetCancelRef} onClick={resetOnClose}>
  //             Cancel
  //           </Button>
  //           <Button variantColor='red' onClick={resetHandler} ml={3}>
  //             Delete
  //           </Button>
  //         </AlertDialogFooter>
  //       </AlertDialogContent>
  //     </AlertDialog>
  //   </React.Fragment>
  // )
}
