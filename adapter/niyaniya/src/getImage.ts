import type { DataSource } from "@riffyh/commons";
import type { Options } from "./types/Options";
import { headers } from "./constants/headers";

export const getImage = async (
  { url }: Parameters<DataSource["getImage"]>[0],
  options: Options,
): ReturnType<DataSource["getImage"]> =>
  fetch(url, {
    headers: {
      ...headers,
      "User-Agent": options.userAgent,
    },
  }).then(async (o) => {
    if (o.ok) return Buffer.from(await o.arrayBuffer());
    else throw o;
  });
