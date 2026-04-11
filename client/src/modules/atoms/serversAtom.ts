import { persistentJSON } from "@nanostores/persistent";
import { useStore } from "@nanostores/react";
import type { Server } from "modules/types/Server";

export const serversAtom = persistentJSON<Server[]>("riffyh:servers", []);

export const useServersAtom = () => useStore(serversAtom);

export const addServer = (server: Omit<Server, "active">) => {
  const current = serversAtom.get();
  const newServer = { ...server, active: current.length === 0 };
  serversAtom.set([...current, newServer]);
};

export const updateServer = (index: number, server: Omit<Server, "active">) => {
  const current = serversAtom.get();
  const updated = [...current];
  updated[index] = { ...server, active: updated[index].active };
  serversAtom.set(updated);
};

export const removeServer = (index: number) => {
  const current = serversAtom.get();
  const removedActive = current[index].active;
  const updated = current.filter((_, i) => i !== index);
  if (removedActive && updated.length > 0) {
    updated[0].active = true;
  }
  serversAtom.set(updated);
};

export const setActiveServer = (index: number) => {
  const current = serversAtom.get();
  const updated = current.map((s, i) => ({ ...s, active: i === index }));
  serversAtom.set(updated);
};
