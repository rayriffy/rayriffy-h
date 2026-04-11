import type { DataSource } from "@riffyh/commons";

export const getImage: DataSource["getImage"] = ({ url }) =>
  fetch(url).then(async (o) => {
    if (o.ok) return Buffer.from(await o.arrayBuffer());
    else throw o;
  });
