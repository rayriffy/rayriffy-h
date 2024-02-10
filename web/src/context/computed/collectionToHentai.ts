import { computed } from 'nanostores'
import { collection } from '../collection'

export const collectionToHentai = computed(collection, collection => {
  return collection.map(o => o.data)
})
