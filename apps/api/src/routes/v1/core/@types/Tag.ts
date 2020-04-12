export interface Tag {
  id: number
  type:
    | 'parody'
    | 'tag'
    | 'language'
    | 'character'
    | 'group'
    | 'artist'
    | 'category'
  name: string
}
