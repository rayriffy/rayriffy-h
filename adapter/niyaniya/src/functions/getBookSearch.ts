import { headers } from "../constants/headers";
import type { NiyaSearchResult } from "../types/NiyaSearchResult";

export const getBookSearch = async (
  searchQuery: string | null,
  page: number,
  userAgent: string,
) => {
  const payload = new URLSearchParams();

  if (searchQuery !== null && searchQuery !== "") payload.append("s", searchQuery);
  if (page !== 1) payload.append("page", page.toString());

  const data = await fetch(`https://api.schale.network/books?${payload.toString()}`, {
    headers: {
      ...headers,
      "User-Agent": userAgent,
    },
  }).then((o) => {
    if (o.ok) return o.json() as Promise<NiyaSearchResult>;
    else throw o;
  });

  return data;
};
