import React, { useState } from 'react'

import { isEmpty } from 'lodash-es'

import {
  Box,
  Button,
  Flex,
  Icon,
  Input,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useClipboard,
  useColorMode,
  useDisclosure,
  useToast,
} from '@chakra-ui/core'

import Heading from '../../../core/components/heading'

import { ICollection } from '../../../core/@types/ICollection'
import { IActionsProps } from '../@types/IActionsProps'

const ActionsComponent: React.FC<IActionsProps> = props => {
  const { collection, setCollection } = props

  const toast = useToast()
  const { colorMode } = useColorMode()

  const {
    isOpen: exportIsOpen,
    onOpen: exportOnOpen,
    onClose: exportOnClose,
  } = useDisclosure()
  const { 0: exportStat, 1: setExportStat } = useState<
    'wait' | 'load' | string
  >('wait')
  const { onCopy, hasCopied } = useClipboard(exportStat)

  const {
    isOpen: importIsOpen,
    onOpen: importOnOpen,
    onClose: importOnClose,
  } = useDisclosure()
  const { 0: importLoad, 1: setImportLoad } = useState<boolean>(false)
  const { 0: input, 1: setInput } = useState<string>('')

  const exportHandler = async () => {
    try {
      setExportStat('load')

      const res: { key: string } = await fetch(
        `https://bytebin.lucko.me/post`,
        {
          credentials: 'same-origin',
          method: 'POST',
          body: JSON.stringify(collection),
          headers: { 'Content-Type': 'application/json' },
        }
      ).then(raw => raw.json())

      setExportStat(res.key)

      toast({
        title: 'Data exported.',
        description: 'Please import data to destination device within 1 hour.',
        status: 'success',
        duration: 4000,
        isClosable: true,
      })
    } catch {
      toast({
        title: 'Failed.',
        description: 'Unable to export data.',
        status: 'error',
        duration: 4000,
        isClosable: true,
      })
    }
  }

  const importHandler = async (id: string) => {
    try {
      setImportLoad(true)

      const res: ICollection = await fetch(
        `https://bytebin.lucko.me/${id}`
      ).then(raw => raw.json())

      if (
        typeof res === 'object' &&
        typeof res.version === 'number' &&
        typeof res.data === 'object' &&
        res.data.length !== undefined
      ) {
        setCollection(res)

        toast({
          title: 'Data imported.',
          description: `Imported ${res.data.length} items to collection.`,
          status: 'success',
          duration: 4000,
          isClosable: true,
        })

        setImportLoad(false)
        importOnClose()
      } else {
        toast({
          title: 'Failed.',
          description: 'Invalid format.',
          status: 'error',
          duration: 4000,
          isClosable: true,
        })

        setImportLoad(false)
        importOnClose()
      }
    } catch (e) {
      toast({
        title: 'Failed.',
        description: 'Unable to import data.',
        status: 'error',
        duration: 4000,
        isClosable: true,
      })

      setImportLoad(false)
      importOnClose()
    }
  }

  return (
    <React.Fragment>
      <Flex justifyContent='center' pt={2}>
        <Flex width={22 / 24} alignItems='center'>
          <Menu>
            <MenuButton as={Button}>
              Actions <Icon pl={2} name='chevron-down' />
            </MenuButton>
            <MenuList>
              <MenuItem
                onClick={exportOnOpen}
                isDisabled={isEmpty(collection.data)}>
                Export
              </MenuItem>
              <MenuItem onClick={importOnOpen}>Import</MenuItem>
              <MenuDivider />
              <MenuItem>Reset</MenuItem>
            </MenuList>
          </Menu>
          <Heading pl={4} size='sm'>
            {collection.data.length} Items
          </Heading>
        </Flex>
      </Flex>

      <Modal isOpen={exportIsOpen} onClose={exportOnClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Export</ModalHeader>
          <ModalBody>
            {exportStat !== 'wait' && exportStat !== 'load' ? (
              <React.Fragment>
                Your export key is: <b>{exportStat}</b>
                <br />
                This key will expire in 1 hour.
              </React.Fragment>
            ) : (
              <React.Fragment>
                Your collection will be available to import for <b>1 hour</b>.
                <br />
                Are you sure to do that?
              </React.Fragment>
            )}
          </ModalBody>

          <ModalFooter>
            {exportStat === 'wait' || exportStat === 'load' ? (
              <Button
                variantColor='blue'
                mr={3}
                onClick={exportHandler}
                isLoading={exportStat === 'load'}>
                Export
              </Button>
            ) : (
              <Button variant='ghost' mr={3} onClick={onCopy}>
                {hasCopied ? 'Copied' : 'Copy'}
              </Button>
            )}
            <Button
              variant={
                exportStat !== 'wait' && exportStat !== 'load'
                  ? undefined
                  : 'ghost'
              }
              variantColor={
                exportStat !== 'wait' && exportStat !== 'load'
                  ? 'blue'
                  : undefined
              }
              onClick={exportOnClose}
              isDisabled={exportStat === 'load'}>
              {exportStat !== 'wait' && exportStat !== 'load'
                ? 'Done'
                : 'Cancel'}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={importIsOpen} onClose={importOnClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Import</ModalHeader>
          <ModalBody>
            Enter import key here
            <Box py={2}>
              <Input
                value={input}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setInput(e.target.value)
                }
                placeholder='Type here'
                isDisabled={importLoad}
                color={colorMode === 'dark' ? 'white' : undefined}
                _placeholder={{
                  color: colorMode === 'dark' ? 'gray.300' : 'gray.500',
                }}
              />
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button
              variantColor='blue'
              mr={3}
              isLoading={importLoad}
              onClick={() => importHandler(input)}>
              Import
            </Button>
            <Button
              variant='ghost'
              onClick={importOnClose}
              isDisabled={importLoad}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </React.Fragment>
  )
}

export default ActionsComponent
