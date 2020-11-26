import { itemsPerPage } from '@rayriffy-h/constants'
import { codes } from '@rayriffy-h/datasource'

import chunk from 'lodash/chunk'
import get from 'lodash/get'
import reverse from 'lodash/reverse'

export const getPage = (page: number) => {
  const chunkedCodes = reverse(chunk(codes, itemsPerPage))
  return get(chunkedCodes, page - 1)
}
