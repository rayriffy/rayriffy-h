import type { DataSource } from "@riffyh/commons";

export interface Server {
  config: {
    baseUrl: string;
    headers: Record<string, string>;
  };
  active: boolean;
  dataSources: Pick<DataSource, "key" | "name" | "iconUrl">[];
}
