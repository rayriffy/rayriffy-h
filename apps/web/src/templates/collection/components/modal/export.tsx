import React, { useState } from 'react'

import { fetch } from '@rayriffy-h/fetch'

import { useStoreon } from '../../../../store'

import { useClipboard } from '../../../../core/services/functions/useClipboard'

import { ModalExportProps } from '../../@types/ModalExportProps'

export const ModalExport: React.FC<ModalExportProps> = props => {
  const { onClose } = props

  const [exportStat, setExportStat] = useState<null | 'load' | 'fail' | string>(
    null
  )
  const { onCopy, hasCopied } = useClipboard(exportStat)

  const { collection } = useStoreon('collection')

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
      setExportStat('fail')
    }
  }

  return (
    <React.Fragment>
      <div className="text-sm text-gray-600 dark:text-gray-400 pb-2">
        {exportStat === 'fail' ? (
          `Sorry, there's some problem during request to server. Please wait for a few minutes and try again. Sorry... (*_ _)人`
        ) : exportStat === null ? (
          'Collection is saved locally inside device and do not share any these information to us. You can use this feature to get temporary transfer key and share you collection to another devices.'
        ) : exportStat === 'load' ? (
          'Requesting for transfer key from server...'
        ) : (
          <React.Fragment>
            <div className="pb-2">
              Your transfer key is{' '}
              <b className="text-gray-700 dark:text-gray-300">{exportStat}</b>
            </div>
            <div>
              You can send this key to another device to import by clicking{' '}
              <b className="text-gray-700 dark:text-gray-300 italic">
                Actions &gt; Import
              </b>{' '}
              and keep in mind that this key will expire in 1 hour.
            </div>
          </React.Fragment>
        )}
      </div>
      <div className="pt-4 pb-2 flex justify-end flex-wrap">
        <button
          className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-4 transition-all duration-200 select-none"
          onClick={() => (onClose ? onClose() : null)}
        >
          {exportStat === null || exportStat === 'load' || exportStat === 'fail'
            ? 'Cancel'
            : 'Close'}
        </button>
        {exportStat === null ||
        exportStat === 'load' ||
        exportStat === 'fail' ? (
          <button
            className={`${
              exportStat !== 'load'
                ? 'bg-blue-500 hover:bg-blue-700 cursor-pointer text-white'
                : 'bg-gray-500 hover:bg-gray-700 cursor-not-allowed text-white dark:text-gray-800'
            } font-bold py-2 px-4 rounded transition-all duration-200 select-none`}
            onClick={() => (exportStat !== 'load' ? exportHandler() : null)}
          >
            {exportStat !== 'load' ? 'Export' : 'Exporting'}
          </button>
        ) : (
          <button
            className={`${
              exportStat !== 'load'
                ? 'bg-blue-500 hover:bg-blue-700 cursor-pointer text-white'
                : 'bg-gray-500 hover:bg-gray-700 cursor-not-allowed text-white dark:text-gray-800'
            } font-bold py-2 px-4 rounded transition-all duration-200 select-none`}
            onClick={onCopy}
          >
            {hasCopied ? 'Copied' : 'Copy'}
          </button>
        )}
      </div>
    </React.Fragment>
  )
}
