import { nhentai } from "@riffyh/adapter-nhentai";
import { niyaniya } from "@riffyh/adapter-niyaniya";

import { nhentaiStore } from "./store/nhentai";

import type { Config } from "@riffyh/commons";

const config: Config = {
  secretboxKey: Bun.env.SECRETBOX_KEY!,
  dataSources: [
    nhentai(),
    niyaniya({
      crt: "2c483e82-b4c6-4b5a-be43-e0873da715b7",
      userAgent:
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:152.0) Gecko/20100101 Firefox/152.0",
    }),
  ],
  store: [nhentaiStore],
};

export default config;
