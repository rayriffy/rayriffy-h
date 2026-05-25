import { useMemo } from "react";
import { treaty } from "@elysiajs/eden";
import type { Server } from "@riffyh/server";
import { useActiveServer } from "./useActiveServer";
import { decode as decodeToon } from "@toon-format/toon/packages/toon/src";

export const useEden = () => {
  const activeServer = useActiveServer();

  return useMemo(() => {
    if (activeServer) {
      return treaty<Server>(activeServer.config.baseUrl, {
        headers: {
          ...activeServer.config.headers,
          Accept: "text/toon",
        },
        throwHttpError: true,
        onResponse: async (response) => {
          if (response.headers.get("Content-Type")?.startsWith("text/toon")) {
            try {
              return decodeToon(await response.text());
            } catch (e) {
              console.error(e);
              throw e;
            }
          }
        },
      });
    }

    return null;
  }, [activeServer]);
};
