import { persistentMap } from "@nanostores/persistent";
import { useStore } from "@nanostores/react";
import type { Settings } from "modules/types/Settings";

export const settingsAtom = persistentMap<Settings>(
  "riffyh:settings",
  {
    safemode: false,
  },
  {
    encode: JSON.stringify,
    decode: JSON.parse,
  },
);

export const useSettingsAtom = () => useStore(settingsAtom);
