import { useMemo } from "react";
import { treaty } from "@elysiajs/eden";
import type { Server } from "@riffyh/server";
import { useActiveServer } from "./useActiveServer";

export const useEden = () => {
  const activeServer = useActiveServer();

  return useMemo(() => {
    if (activeServer) {
      return treaty<Server>(activeServer.config.baseUrl, {
        headers: activeServer.config.headers,
        throwHttpError: true,
      });
    }

    return null;
  }, [activeServer]);
};
