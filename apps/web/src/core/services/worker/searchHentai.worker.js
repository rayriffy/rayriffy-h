import { get, intersection, union } from 'lodash-es'

export const searchHentai = async (query, raws) => {
  const resultsByWords = query
    .split(' ')
    .filter(o => o !== '')
    .map(subquery => {
      /**
       * Filter the search by names
       */

      const languages = ['english', 'japanese', 'pretty']

      const typeName = union(
        ...languages.map(language => {
          return raws.filter(raw => {
            const title = get(raw, `raw.title.${language}`, '')

            return RegExp(subquery.toLocaleLowerCase()).test(
              title === null ? '' : title.toLocaleLowerCase()
            )
          })
        })
      ).reduce((a, b) => a.concat(b), [])

      /**
       * Filter the search by tags
       */

      const typeTag = raws.filter(raw => {
        const tagResult = raw.raw.tags.map(tag => {
          const name = tag.name.toLocaleLowerCase()

          return RegExp(subquery.toLocaleLowerCase()).test(name)
        })

        return tagResult.some(o => o === true)
      })

      return union(typeName, typeTag)
    })

  return intersection(...resultsByWords)
}
