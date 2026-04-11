import { persistentJSON } from "@nanostores/persistent";
import { useStore } from "@nanostores/react";
import type { Gallery } from "@riffyh/commons";

export const collectionsAtom = persistentJSON<Omit<Gallery, "pages">[]>("riffyh:collections", []);

export const useCollectionsAtom = () => useStore(collectionsAtom);
