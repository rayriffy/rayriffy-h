import _ from 'lodash'

import { IFetchedRaw } from '../../../core/@types/IFetchedRaw'

export const searchHentai = async (query: string, raws: IFetchedRaw[]): Promise<IFetchedRaw[]> => {
  // TODO: Code search logic here

  /**
   * Filter the search by names
   */

  const languages = ['english', 'japanese', 'pretty']

  const typeName: IFetchedRaw[] = _.flatten(_.union(languages.map(language => {
    return raws.filter(raw => {
      const title: string = _.get(raw, `title.${language}`, '')

      return RegExp(query).test(title)
    })
  })))

  /**
   * Filter the search by tags
   */

  // const typeTag: IFetchedRaw[] = raws.filter(raw => {

  // })

  return _.union(typeName)
}
