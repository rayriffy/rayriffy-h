import { itemsPerPage } from '@rayriffy-h/constants'
import { codes } from '@rayriffy-h/datasource'

const chunk = <T = unknown>(input: T[], size: number): T[][] => {
  return input.reduce((arr, item, idx) => {
    return idx % size === 0
      ? [...arr, [item]]
      : [...arr.slice(0, -1), [...arr.slice(-1)[0], item]]
  }, [])
}

export const getPage = (page: number) => {
  const chunkedCodes = chunk(codes.reverse(), itemsPerPage)
  return chunkedCodes[page - 1]
}
