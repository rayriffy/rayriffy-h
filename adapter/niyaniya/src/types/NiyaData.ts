export interface NiyaData {
  data: Record<
    number,
    {
      id: number;
      key: string;
      size: number; // bytes
    }
  >;
  similar: {
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
  statistic: {
    views: number;
    downloads: number;
    favorites: number;
  };
}
