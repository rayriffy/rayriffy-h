import { headers } from "../constants/headers";
import type { NiyaGallery } from "../types/NiyaGallery";

export const getBookDetail = async (bookId: string, bookKey: string, userAgent: string) => {
  const data = await fetch(`https://api.schale.network/books/detail/${bookId}/${bookKey}`, {
    headers: {
      ...headers,
      "User-Agent": userAgent,
    },
  }).then((o) => {
    if (o.ok) return o.json() as Promise<NiyaGallery>;
    else throw o;
  });

  return data;
};
