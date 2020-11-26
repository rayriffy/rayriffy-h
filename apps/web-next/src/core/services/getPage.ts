import { itemsPerPage } from '@rayriffy-h/constants'
import { codes } from '@rayriffy-h/datasource'

import chunk from 'lodash/chunk'
import get from 'lodash/get'

export const getPage = (page: number) => {
  const chunkedCodes = chunk(codes, itemsPerPage)
  return get(chunkedCodes, page - 1)
}
