import { headers } from "../constants/headers";
import type { NiyaData } from "../types/NiyaData";

export const getBookData = async (
  bookId: string,
  bookKey: string,
  crt: string,
  userAgent: string,
) => {
  const data = await fetch(
    `https://api.schale.network/books/detail/${bookId}/${bookKey}?${new URLSearchParams({
      crt,
    }).toString()}`,
    {
      method: "POST",
      headers: {
        ...headers,
        "User-Agent": userAgent,
      },
    },
  ).then((o) => {
    if (o.ok) return o.json() as Promise<NiyaData>;
    else throw o;
  });

  return data;
};
