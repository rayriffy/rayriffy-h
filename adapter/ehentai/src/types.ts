export type GalleryHost = "e-hentai.org" | "exhentai.org";

export interface Options {
  userAgent?: string;
}

export interface ExHentaiOptions extends Options {
  ipb_member_id: string;
  ipb_pass_hash: string;
  igneous: string;
}

export interface GalleryReference {
  gid: string;
  token: string;
}

export interface GalleryMetadata extends GalleryReference {
  category: string;
  filecount: string;
  tags: string[];
  thumb: string;
  title: string;
  title_jpn?: string;
}
