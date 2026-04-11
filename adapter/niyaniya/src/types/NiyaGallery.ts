export interface NiyaGallery {
  id: number;
  key: string;
  created_at: number; // unix
  title: string;
  thumbnails: {
    base: string;
    fallback: string;
    main: {
      path: string;
      dimensions: [number, number];
    };
    entries: {
      path: string;
      dimensions: [number, number];
    }[];
  };
  tags: {
    name: string;
    count: number;
    namespace: number;
  }[];
  statistic: {
    views: number;
    downloads: number;
    favorites: number;
  };
}
