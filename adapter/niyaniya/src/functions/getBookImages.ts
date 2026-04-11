import { headers } from "../constants/headers";
import type { NiyaImages } from "../types/NiyaImages";

export const getBookImage = async (
  size: number,
  bookId: string,
  bookKey: string,
  dataId: string,
  dataKey: string,
  crt: string,
  userAgent: string,
) => {
  const data = await fetch(
    `https://api.schale.network/books/data/${bookId}/${bookKey}/${dataId}/${dataKey}/${size}?${new URLSearchParams(
      {
        crt,
      },
    ).toString()}`,
    {
      headers: {
        ...headers,
        "User-Agent": userAgent,
      },
    },
  ).then((o) => {
    if (o.ok) return o.json() as Promise<NiyaImages>;
    else throw o;
  });

  return data;
};
