export interface Search {
  main: {
    query: string
  }
  listing: {
    query: string
  }
  collection: {
    query: string
    page: number
  }
}
