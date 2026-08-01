import { nhentai } from "@riffyh/adapter-nhentai";
import { niyaniya } from "@riffyh/adapter-niyaniya";
import { store } from "@riffyh/adapter-store";
import { ehentai, exhentai } from "@riffyh/adapter-ehentai"

import { nhentaiStore } from "./store/nhentai";

import type { Config } from "@riffyh/commons";

const config: Config = {
  secretboxKey: Bun.env.SECRETBOX_KEY!,
  dataSources: [
    nhentai(),
    niyaniya({
      crt: Bun.env.NIYANIYA_CRT!,
      userAgent: Bun.env.NIYANIYA_USER_AGENT!,
    }),
    ehentai(),
    exhentai({
      ipb_member_id: Bun.env.EHENTAI_IPB_MEMBER_ID!,
      ipb_pass_hash: Bun.env.EHENTAI_IPB_PASS_HASH!,
      igneous: Bun.EHENTAI_IGNEOUS!,
    }),
    store({
      mongoDBUri: Bun.env.MONGODB_URI!,
    }),
  ],
  store: [nhentaiStore],
};

export default config;
