import { Collection } from '../../core/@types'

export const collectionMigration = (input: string): Collection => {
  if (typeof input === 'string') {
    return {
      version: 1,
      data: JSON.parse(input).reverse(),
    }
  } else {
    return input
  }
}
