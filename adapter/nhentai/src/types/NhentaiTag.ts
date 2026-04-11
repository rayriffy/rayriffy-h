import type { TagType } from "@riffyh/commons";

export interface NhentaiTag {
  id: number;
  type: TagType;
  name: string;
  slug: string;
  url: string;
  count: number;
}
