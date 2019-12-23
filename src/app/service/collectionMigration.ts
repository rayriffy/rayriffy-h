import { ICollection } from '../../core/@types/ICollection'

export const collectionMigration = (input: any): ICollection => {
  if (typeof input === 'string') {
    return {
      version: 1,
      data: JSON.parse(input).reverse(),
    }
  } else {
    return input
  }
}
