export interface SearchStore {
  search: {
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
}
