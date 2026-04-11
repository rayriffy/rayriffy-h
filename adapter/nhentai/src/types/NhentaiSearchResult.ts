export interface NhentaiSearchResult {
  result: {
    id: number;
    media_id: string;
    thumbnail: string;
    thumbnail_width: number;
    thumbnail_height: number;
    english_title: string;
    japanese_title: string;
    num_pages: number;
    tag_ids: number[];
  }[];
  num_pages: number;
  total: number;
  per_page: number;
}
