import { nhentai } from "@riffyh/adapter-nhentai";
import { niyaniya } from "@riffyh/adapter-niyaniya";

import type { Config } from "@riffyh/commons";

const config: Config = {
  dataSources: [
    nhentai(),
    niyaniya({
      crt: "405d25f6-08e4-4659-8f1b-c5c6d2012388",
      userAgent:
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:149.0) Gecko/20100101 Firefox/149.0",
    }),
  ],
};

export default config;
