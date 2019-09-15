export interface ITag {
  id: number
  type: 'parody' | 'tag' | 'language' | 'character' | 'group' | 'artist' | 'category'
  name: string
  url: string
  count: number
}