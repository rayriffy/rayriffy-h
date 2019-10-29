import _ from 'lodash'

import { IFetchedRaw } from '../../../core/@types/IFetchedRaw'

export const searchHentai = async (query: string, raws: IFetchedRaw[]): Promise<IFetchedRaw[]> => {
  const resultsByWords = query.split(' ').map(subquery => {
    if (subquery === '') {
      return []
    } else {
      /**
       * Filter the search by names
       */
    
      const languages = ['english', 'japanese', 'pretty']
    
      const typeName: IFetchedRaw[] = _.flatten(_.union(languages.map(language => {
        return raws.filter(raw => {
          const title: string = _.get(raw, `title.${language}`, '').toLocaleLowerCase()
    
          return RegExp(subquery.toLocaleLowerCase()).test(title)
        })
      })))
    
      /**
       * Filter the search by tags
       */
    
      const typeTag: IFetchedRaw[] = raws.filter(raw => {
        const tagResult: boolean[] = raw.data.raw.tags.map(tag => {
          const name = tag.name.toLocaleLowerCase()
    
          return RegExp(subquery.toLocaleLowerCase()).test(name)
        })
    
        return tagResult.some(o => o === true)
      })
    
      return _.union(typeName, typeTag)
    }
  })

  return _.intersection(_.flatten(resultsByWords))
}
