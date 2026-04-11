import { useServersAtom } from "modules/atoms/serversAtom";

export const useActiveServer = () => {
  const servers = useServersAtom();

  return servers?.find((server) => server.active);
};
