import flatten from 'lodash.flatten'
import get from 'lodash.get'
import intersection from 'lodash.intersection'
import union from 'lodash.union'

export const searchHentai = async (query, raws) => {
  const resultsByWords = query
    .split(' ')
    .filter(o => o !== '')
    .map(subquery => {
      /**
       * Filter the search by names
       */

      const languages = ['english', 'japanese', 'pretty']

      const typeName = flatten(
        union(
          ...languages.map(language => {
            return raws.filter(raw => {
              const title = get(
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

      const typeTag = raws.filter(raw => {
        const tagResult = raw.tags.map(tag => {
          const name = tag.name.toLocaleLowerCase()

          return RegExp(subquery.toLocaleLowerCase()).test(name)
        })

        return tagResult.some(o => o === true)
      })

      return union(typeName, typeTag)
    })

  return intersection(...resultsByWords)
}
