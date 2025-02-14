import fs from "fs";
import path from "path";
import type { Hentai } from "@riffyh/commons";
import { hentaiDirectory } from "../constants/hentaiDirectory";

export const writeItem = (code: string | number, item: Hentai | string) => {
  const file = path.join(hentaiDirectory, `${code}.json`)
  return fs.promises.writeFile(
    file,
    typeof item === 'string' ? item : JSON.stringify(item)
  )
}
