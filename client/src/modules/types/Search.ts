export interface Search {
  main: SearchInput;
  collection: SearchInput;
}

export interface SearchInput {
  query: string;
  key?: string;
  page: number;
}
