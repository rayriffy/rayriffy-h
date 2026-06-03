import { persistentJSON } from "@nanostores/persistent";
import { useStore } from "@nanostores/react";
import type { Gallery } from "@riffyh/commons";

export type Collection = Omit<Gallery, "pages">[];

export const collectionsAtom = persistentJSON<Collection>("riffyh:collections", []);

export const useCollectionsAtom = () => useStore(collectionsAtom);
