import { flatten, get, intersection, union } from 'lodash'

import { IFetchedRaw } from '../../../core/@types/IFetchedRaw'

export const searchHentai = async (
  query: string,
  raws: IFetchedRaw[]
): Promise<IFetchedRaw[]> => {
  const resultsByWords = query
    .split(' ')
    .filter(o => o !== '')
    .map(subquery => {
      /**
       * Filter the search by names
       */

      const languages = ['english', 'japanese', 'pretty']

      const typeName: IFetchedRaw[] = flatten(
        union(
          ...languages.map(language => {
            return raws.filter(raw => {
              const title: string = get(
                raw,
                `title.${language}`,
                ''
              ).toLocaleLowerCase()

              return RegExp(subquery.toLocaleLowerCase()).test(title)
            })
          })
        )
      )

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

      return union(typeName, typeTag)
    })

  return intersection(...resultsByWords)
}
