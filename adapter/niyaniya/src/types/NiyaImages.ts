export interface NiyaImages {
  base: string;
  fallback: string;
  entries: {
    path: string;
    dimensions: [number, number];
  }[];
}
