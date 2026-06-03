import { collectionsAtom, type Collection } from "modules/atoms/collectionsAtom";
import { decode as decodeToon, encode as encodeToon } from "@toon-format/toon/packages/toon/src";
import { useMutation } from "@tanstack/react-query";
import { useEden } from "modules/utils/useEden";

export const useExportCollection = () => {
  const eden = useEden();

  return useMutation({
    mutationFn: async () => {
      const collection = encodeToon(collectionsAtom.get());
      const response = await eden?.collection.export.post(collection);
      return response?.data;
    },
  });
};

export const useImportCollection = () => {
  const eden = useEden();

  return useMutation({
    mutationFn: async (key: string) => {
      const response = await eden?.collection.import.get({
        query: {
          key,
        },
      });

      if (typeof response?.data !== "string") throw new Error("failed to import");

      const decoded = decodeToon(response?.data) as Collection;
      collectionsAtom.set(decoded);
      return decoded;
    },
  });
};
