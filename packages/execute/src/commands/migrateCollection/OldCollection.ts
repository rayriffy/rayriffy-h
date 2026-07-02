import type { TagType } from "@riffyh/commons";

export interface OldCollection {
  id: number;
  internal: boolean;
  data: {
    id: number;
    media_id: string;
    title: {
      english: string;
      japanese: string;
      pretty: string;
    };
    images: {
      cover: {
        w: number;
        h: number;
        t: "j" | "p" | "g";
      };
    };
    tags: {
      id: string;
      type: TagType;
      name: string;
    }[];
    num_pages: number;
  };
}
