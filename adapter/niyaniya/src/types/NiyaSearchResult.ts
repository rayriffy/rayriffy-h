export interface NiyaSearchResult {
  limit: number;
  page: number;
  total: number;
  entries: {
    id: number;
    key: string;
    title: string;
    language: number;
    pages: number;
    thumbnail: {
      path: string;
      fallback: string;
      dimensions: [number, number];
    };
  }[];
}
